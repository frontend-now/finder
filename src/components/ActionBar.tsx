import React from 'react'
import styled from 'styled-components'

import Icon from 'components/Icon'

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

export default StyledActionBar
