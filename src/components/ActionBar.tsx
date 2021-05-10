import React from 'react'
import styled from 'styled-components'

import Icon from 'components/Icon'
import { currentDirectory } from 'components/Directory'

type ActionBarProps = {
  className?: string
}

function ActionBar({ className }: ActionBarProps) {
  return (
    <div className={className}>
      <div className="navSection">
        <Icon name="back" fillColor="#ffffff" />
        <Icon name="forward" strokeColor="#ffffff" fillColor="#ffffff" />
        <span>{currentDirectory}</span>
      </div>
      <div className="actionsSection">
        <Icon name="grid" data-grid fillColor="#ffffff" />
        <Icon name="sort" fillColor="#ffffff" />
        <Icon name="upload" fillColor="#ffffff" />
        <Icon name="tag" data-tag fillColor="#ffffff" />
        <Icon name="search" fillColor="#ffffff" />
      </div>
    </div>
  )
}

const StyledActionBar = styled(ActionBar)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .navSection, .actionsSection {
    display: flex;
    align-items: center;

    span {
      color: #ffffff;
      font-weight: 600;
    }

    * {
      margin-right: 20px;
    }

    [data-grid], [data-tag] {
      margin-right: 60px;
    }
  }
`

export default StyledActionBar
