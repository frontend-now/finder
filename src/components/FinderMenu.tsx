import React, { MutableRefObject, useCallback, useEffect, useRef, useState, Fragment, Key } from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { useAtomCallback } from 'jotai/utils'
import { usePopper } from 'react-popper'
import uuid from 'uuid-random'

import Divider from 'components/Divider'
import kebabCase from 'lib/kebabCase'
import Portal from 'components/Portal'
import { directoriesAtom } from 'components/FinderCanvas'
import { directoryDerivedState, nameCountHash } from 'components/Directory'

type FinderMenuProps = {
  parentRef: MutableRefObject<any>,
  children: (popoverProps: any) => React.ReactNode
}

function generateGetBoundingClientRect(e: React.MouseEvent<any>) {
  return () => ({
    width: 0,
    height: 0,
    top: e.clientY || 0,
    right: e.clientX || 0,
    bottom: e.clientY || 0,
    left: e.clientX || 0
  }) as DOMRect
}

function FinderContextMenu({ parentRef, children }: FinderMenuProps) {
  const [ isActive, setIsActive ] = useState(false)
  const virtualReferenceElement = useRef({} as HTMLElement)
  const parentTargetElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const openMenu = (e: React.MouseEvent<any>) => {
      e.preventDefault()

      parentTargetElement.current = (e.target as HTMLElement).parentElement
      virtualReferenceElement.current.getBoundingClientRect = generateGetBoundingClientRect(e)

      setIsActive(true)
    }

    const closeMenu = () => {
      virtualReferenceElement.current = {} as HTMLElement
      setIsActive(false)
    }
    const parentElement = parentRef.current

    if (parentElement) {
      parentElement.addEventListener('contextmenu', openMenu)
      window.addEventListener('click', closeMenu)
    }

    return () => {
      parentElement.removeEventListener('contextMenu', openMenu)
      window.removeEventListener('click', closeMenu)
    }
  }, [ parentRef, virtualReferenceElement ])

  return (
    <Portal>
      {isActive && (
        children({
          referenceElement: virtualReferenceElement.current,
          parentTargetElement: parentTargetElement.current
        })
      )}
    </Portal>
  )
}

const StyledFinderMenu = styled('div')`
  height: auto;
  width: 200px;
  border: 1px solid #444242;
  background: rgb(33,30,41, 0.4);
  border-radius: 5px;
  color: white;
  padding: 10px;
  backdrop-filter: blur(10px);

  .finderMenuSectionLabel {
    margin-bottom: 5px;
    cursor: pointer;
  }
`

type FinderMenuSection = {
  label: string,
  onClick?: ((e: any) => void)
}[][]

function FinderMenu({ referenceElement, parentTargetElement }: any) {
  const [ popperElement, setPopperElement ] = useState<HTMLElement | null>(null)

  const isDirectoryClicked = parentTargetElement?.hasAttribute('data-directory-id')

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right-start',
    strategy: 'fixed'
  })

  const [ directories ] = useAtom(directoriesAtom)

  const createDirectory = useAtomCallback(useCallback((
    get, set, label?: string
  ) => {
    const newDirectory = uuid()

    set(directoriesAtom, [ ...directories, newDirectory ])

    const directoryLabel = label || 'New'

    const nameCount = get(nameCountHash(directoryLabel))[directoryLabel]

    set(nameCountHash(directoryLabel), {
      [directoryLabel]: nameCount + 1
    })

    set(directoryDerivedState({ id: newDirectory, label }), {
      label: label || `New${nameCount ? nameCount + 1 : ''}`,
      id: newDirectory
    })
  }, [ directories ]))

  const removeDirectory = useAtomCallback(useCallback((
    get, set
  ) => {
    const clickedDirectoryId = parentTargetElement.getAttribute('data-directory-id')
    const clickedDirectoryIndex = directories.findIndex(
      (directoryId) => directoryId === clickedDirectoryId
    )
    const newDirectories = [ ...directories ]
    newDirectories.splice(clickedDirectoryIndex, 1)

    set(directoriesAtom, newDirectories)
  }, [ directories, parentTargetElement ]))

  const duplicateDirectory = useAtomCallback(useCallback((
    get
  ) => {
    const clickedDirectoryId = parentTargetElement.getAttribute('data-directory-id')
    const clickedDirectory = get(directoryDerivedState({ id: clickedDirectoryId }))

    createDirectory(clickedDirectory.label)
  }, [ createDirectory, parentTargetElement ]))

  const finderMenuSections: FinderMenuSection = [
    [ { label: 'New Folder', onClick: () => createDirectory() } ],
    [ { label: 'Get Info', onClick: undefined } ],
    [ { label: 'View', onClick: undefined },
      { label: 'Use Groups', onClick: undefined },
      { label: 'Sort By', onClick: undefined },
      { label: 'Cleanup', onClick: undefined } ]
  ]

  if (isDirectoryClicked) {
    finderMenuSections[0].push(
      { label: 'Duplicate', onClick: duplicateDirectory },
      { label: 'Delete Folder', onClick: removeDirectory }
    )
  }

  return (
    <StyledFinderMenu ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      {finderMenuSections.map((finderMenuSection, index) => {
        const isLastIndex = index === finderMenuSections.length - 1

        return (
          <Fragment key={finderMenuSection[0].label}>
            <div className="finderMenuSection">
              {finderMenuSection.map(({ label, onClick }) => (
                <div
                  role="button"
                  onKeyPress={onClick}
                  onClick={onClick}
                  tabIndex={0}
                  data-testid={kebabCase(label)}
                  className="finderMenuSectionLabel"
                  key={label as Key}
                >
                  {label}
                </div>
              ))}
            </div>
            {!isLastIndex && <Divider />}
          </Fragment>
        )
      })}
    </StyledFinderMenu>
  )
}

export { FinderContextMenu, FinderMenu }
