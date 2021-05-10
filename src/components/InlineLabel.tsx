import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'

import useKeyPress from 'hooks/useKeyPress'
import useClickOutside from 'hooks/useClickOutside'

const StyledLabelInput = styled('input')<any>((props) => ({
  background: '#1f1b28',
  color: 'white',
  border: '1px solid #5ac8ff',
  width: props.width || 'auto'
}),
variant({
  prop: 'active',
  variants: {
    true: {
      font: 'inherit',
      color: '#ffffff',
      textAlign: 'inherit',
      padding: 0,
      background: 'none',
      border: 'none',
      display: 'inherit'
    }
  }
}))

const StyledLabelText = styled('div')<any>(
  { },
  variant({
    prop: 'active',
    variants: {
      true: {
        font: 'inherit',
        color: '#ffffff',
        textAlign: 'inherit',
        padding: 0,
        background: 'none',
        display: 'inherit',
        border: 'none'
      }
    }
  }),
  variant({
    prop: 'hidden',
    variants: {
      true: {
        display: 'none'
      }
    }
  })
)

const StyledInlineLabel = styled('div')``

type InlineLabelProps = {
  text: string,
  onFocusOut?: (value: string) => void
}

function InlineLabel({
  text,
  onFocusOut
}: InlineLabelProps) {
  const [ value, setValue ] = useState(text)
  const [ isEditing, setIsEditing ] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const parentWrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [ isEditing ])

  const enter = useKeyPress('Enter')
  const esc = useKeyPress('Escape')

  useEffect(() => {
    if (isEditing) {
      if (enter) {
        onFocusOut?.(value)
        setIsEditing(false)
      }

      if (esc) {
        setValue(text)
        setIsEditing(false)
      }
    }
  }, [ enter, esc, isEditing, onFocusOut, text, value ])

  const clickOutSideHandler = useCallback(() => {
    if (isEditing) {
      onFocusOut?.(value)
      setIsEditing(false)
    }
  }, [ isEditing, onFocusOut, value ])
  useClickOutside(parentWrapperRef, clickOutSideHandler)

  return (
    <StyledInlineLabel
      ref={parentWrapperRef}
      onClick={() => setIsEditing(true)}
    >
      <StyledLabelText
        active={!isEditing}
        hidden={isEditing}
        onClick={() => setIsEditing(true)}
      >
        {text}
      </StyledLabelText>

      <StyledLabelInput
        ref={inputRef}
        hidden={!isEditing}
        active={isEditing}
        value={value}
        style={{ width: `${Math.ceil(value.length * 1)}ex` }}
        onChange={(e:any) => setValue(e.target.value)}
      />
    </StyledInlineLabel>
  )
}

export default InlineLabel
