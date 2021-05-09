import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { usePopper } from 'react-popper'

import Portal from 'components/Portal'
import Divider from 'components/Divider'

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
  const [ popperElement, setPopperElement ] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const openMenu = (e: React.MouseEvent<any>) => {
      e.preventDefault()
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

  // const { styles, attributes } = usePopper(virtualReferenceElement.curr, popperElement, {
  //   placement: 'right-start',
  //   strategy: 'fixed'
  // })

  return (
    <Portal>
      {isActive && (
        children({
          ref: setPopperElement,
          referenceElement: virtualReferenceElement.current
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
  label: String,
  onClick?: ((e: any) => void)
}[][]

const finderMenuSections: FinderMenuSection = [
  [ { label: 'New Folder', onClick: undefined } ],
  [ { label: 'Get Info', onClick: undefined } ],
  [ { label: 'View', onClick: undefined },
    { label: 'Use Groups', onClick: undefined },
    { label: 'Sort By', onClick: undefined },
    { label: 'Cleanup', onClick: undefined } ]
]

function FinderMenu({ referenceElement, ...popoverProps }: any) {
  const [ popperElement, setPopperElement ] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right-start',
    strategy: 'fixed'
  })

  return (
    <StyledFinderMenu ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      {finderMenuSections.map((finderMenuSection, index) => {
        const isLastIndex = index === finderMenuSections.length - 1

        return (
          <>
            <div className="finderMenuSection">
              {finderMenuSection.map(({ label, onClick }) => (
                <div
                  role="button"
                  onKeyPress={onClick}
                  onClick={onClick}
                  tabIndex={0}
                  className="finderMenuSectionLabel"
                >
                  {label}
                </div>
              ))}
            </div>
            {!isLastIndex && <Divider />}
          </>
        )
      })}
    </StyledFinderMenu>
  )
}

export { FinderContextMenu, FinderMenu }
