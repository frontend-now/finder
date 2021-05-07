import React from 'react'
import styled, { css } from 'styled-components'

import './App.css'
import Sidebar from 'components/Sidebar'
import FinderCanvas from 'components/FinderCanvas'

const StyledRoot = styled('div')`
  padding: 20px;
  height: 100vh;
  margin: auto;
  width: 80%;
  max-width: 1100px;
  display: flex;
  align-items: center;
`

const FinderWrapper = styled('div')`
  box-shadow: 0px 13px 20px rgba(67, 66, 71, 1);
  display: flex;
  align-items: center;
  border-radius: 10px;
  height: 70%;
  overflow: hidden;
  width: 100%;
`

function App() {
  return (
    <StyledRoot>
      <FinderWrapper>
        <Sidebar />
        <FinderCanvas />
      </FinderWrapper>
    </StyledRoot>
  )
}

export default App
