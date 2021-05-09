import React, { useRef } from 'react'
import styled from 'styled-components'

import Directory, { directories, StyledDirectoryWrapper } from 'components/Directory'
import StyledActionBar from 'components/ActionBar'
import { FinderMenu, FinderContextMenu } from 'components/FinderMenu'

const StyledFinderCanvas = styled('div')`
  background-color: #1e1b27;
  flex-wrap: 'wrap';
  flex: 1;
  height: 100%;
  padding: 20px;
`

function FinderCanvas() {
  const parentRef = useRef(null)

  return (
    <>
      <StyledFinderCanvas ref={parentRef}>
        <StyledActionBar />
        <StyledDirectoryWrapper>
          {directories.map((directory) => (
            <Directory directory={directory} />
          ))}
        </StyledDirectoryWrapper>
      </StyledFinderCanvas>
      <FinderContextMenu parentRef={parentRef}>
        {({ ref, ...others }: any) => (
          <FinderMenu ref={ref} {...others} />
        )}
      </FinderContextMenu>
    </>
  )
}

export default FinderCanvas
