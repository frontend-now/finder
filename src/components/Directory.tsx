import React from 'react'
import styled from 'styled-components'

import directoryThumbnail from 'assets/images/directory.svg'

const directories = [ 'Music', 'Music', 'Music', 'Music', 'Music', 'Music', 'Music', 'Music', 'Music' ]

type DirectoryProps = {
  directory: string
}

const StyledDirectoryWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 20px;
  padding: 25px;
`

const StyledDirectory = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    box-shadow: 0px 13px 20px rgba(67, 66, 71, 0.3);
  }

  span {
    color: #ffffff
  }
`

function Directory({ directory }: DirectoryProps) {
  return (
    <StyledDirectory>
      <img src={directoryThumbnail} alt="directory-logo" />
      <span>{directory}</span>
    </StyledDirectory>
  )
}

export default Directory

export { directories, StyledDirectoryWrapper }
