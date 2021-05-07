import React from 'react'
import styled from 'styled-components'

import Icon from 'components/Icon'
import directoryThumbnail from 'assets/images/directory.svg'

const StyledFinderCanvas = styled('div')`
  background-color: #1e1b27;
  flex-wrap: 'wrap';
  flex: 1;
  height: 100%;
  padding: 20px;
`

type ActionBarProps = {
  className?: string
}

function ActionBar({ className }: ActionBarProps) {
  return (
    <div className={className}>
      <div className="navSection">
        <Icon name="back" fillColor="#ffffff" />
        <Icon name="forward" fillColor="#ffffff" />
        <span>Music</span>
      </div>
      <div className="actionsSection">
        <Icon name="grid" data-grid fillColor="#ffffff" />
        <Icon name="sort" fillColor="#ffffff" />
        <Icon name="upload" fillColor="#ffffff" />
        <Icon name="tag" fillColor="#ffffff" />
        <Icon name="search" fillColor="#ffffff" />
      </div>
    </div>
  )
}

const StyledActionBar = styled(ActionBar)`
  display: flex;
  justify-content: space-between;

  .navSection, .actionsSection {
    display: flex;
    align-items: center;

    span {
      color: #ffffff;
      font-weight: 600;
    }

    * {
      margin-right: 10px;
    }

    [data-grid] {
      margin-right: 30px;
    }
  }
`

const directories = [ 'Music' ]

type DirectoryProps = {
  directory: string
}

const StyledDirectoryWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
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

function FinderCanvas() {
  return (
    <StyledFinderCanvas>
      <StyledActionBar />
      <StyledDirectoryWrapper>
        {directories.map((directory) => (
          <Directory directory={directory} />
        ))}
      </StyledDirectoryWrapper>
    </StyledFinderCanvas>
  )
}

export default FinderCanvas
