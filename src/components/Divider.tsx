import React from 'react'
import styled from 'styled-components'

type DividerProps = {
  size?: number
}

const StyledDivider = styled('div')<DividerProps>`
  height: ${(props) => `${props.size}px`};
  width: 100%;
  background: #353535;
  margin: 6px 0px;
`

function Divider({ size = 2 }: DividerProps) {
  return (
    <StyledDivider size={size} />
  )
}

export default Divider
