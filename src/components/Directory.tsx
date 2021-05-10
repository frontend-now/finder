import React, { useCallback } from 'react'
import styled from 'styled-components'
import { atom, useAtom } from 'jotai'
import { atomFamily, useAtomCallback } from 'jotai/utils'

import type { HTMLAttributes, Ref } from 'react'

import directoryThumbnail from 'assets/images/directory.svg'
import InlineLabel from 'components/InlineLabel'

// TODO: Use tree strcture to support nested directories
const directories = Array.from(Array(1).keys()).map((i) => i.toString())

const nameCountHash = atomFamily((label: string) => atom({
  [label]: 0
}))

const currentDirectory = 'Music'

const StyledDirectoryWrapper = styled('div')`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  height: auto;
  overflow: scroll;
  padding: 25px;
`

const StyledDirectory = styled('div')<any>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    box-shadow: 0px 13px 20px rgba(67, 66, 71, 0.3);
    outline: none;
    appearance: none;
    border: none;
    touch-action: none;
    cursor: grab;

    opacity: ${(props) => (props.active ? 0.4 : 1)};
  }

  span {
    color: #ffffff
  }
`

type Directory = {
  id: string,
  label?: string
}

const directoryDerivedState = atomFamily(
  ({ id, label = 'Music' }: Directory) => atom({
    label,
    id
  }),
  (a, b) => a.id === b.id
)

enum Position {
  Before = -1,
  After = 1,
}

type DirectoryProps = HTMLAttributes<HTMLElement> & {
  active?: boolean,
  clone?: boolean,
  id: string,
  index?: number,
  innerRef?: Ref<any>,
  insertPosition?: Position,
  onRemove?(): void
}

function Directory({
  style,
  active,
  innerRef,
  index,
  insertPosition,
  onRemove,
  id,
  ...props
}: DirectoryProps) {
  const [ { label } ] = useAtom(directoryDerivedState({ id }))

  const renameDirectory = useAtomCallback(useCallback((
    get, set, newLabel: string
  ) => {
    const labelWithoutTrailingCount = newLabel.replace(/[0-9]/g, '')
    const trailingCount = Number(newLabel.replace(/^\D+/g, ''))

    const nameCount = get(nameCountHash(labelWithoutTrailingCount))[labelWithoutTrailingCount]

    let currentLabel = ''

    if (nameCount !== undefined) {
      if (nameCount < trailingCount) {
        set(nameCountHash(labelWithoutTrailingCount), {
          [labelWithoutTrailingCount]: trailingCount
        })

        currentLabel = newLabel
      } else {
        set(nameCountHash(labelWithoutTrailingCount), {
          [labelWithoutTrailingCount]: nameCount + 1
        })

        currentLabel = `${labelWithoutTrailingCount}${nameCount ? nameCount + 1 : ''}`
      }
    } else {
      set(nameCountHash(newLabel), {
        [newLabel]: 0
      })
      currentLabel = newLabel
    }

    set(directoryDerivedState({ id }), {
      label: currentLabel,
      id
    })
  }, [ id ]))

  return (
    <StyledDirectory
      active={active}
      style={style}
      ref={innerRef}
      data-directory-id={id}
      {...props}
    >
      <img
        {...props}
        src={directoryThumbnail}
        alt="directory-logo"
      />
      <InlineLabel text={label} onFocusOut={renameDirectory} />
    </StyledDirectory>
  )
}

export default Directory

export {
  directories,
  StyledDirectoryWrapper,
  directoryDerivedState,
  currentDirectory,
  nameCountHash
}

export type { DirectoryProps }
