import React, { HTMLAttributes, Ref, useCallback } from 'react'
import styled from 'styled-components'
import { atom, useAtom } from 'jotai'
import { atomFamily, useAtomCallback } from 'jotai/utils'

import directoryThumbnail from 'assets/images/directory.svg'
import InlineLabel from 'components/InlineLabel'

const directories = Array.from(Array(10).keys()).map((i) => i.toString())

const StyledDirectoryWrapper = styled('div')`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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
  ({ id, label = 'Untitled' }: Directory) => atom({
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
    get, set, newLabel: string = 'Untitled1'
  ) => {
    set(directoryDerivedState({ id, label }), {
      label: newLabel,
      id
    })
  }, [ id, label ]))

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

export { directories, StyledDirectoryWrapper, directoryDerivedState }

export type { DirectoryProps }
