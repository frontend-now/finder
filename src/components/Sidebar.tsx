import React from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'

import Icon from 'components/Icon'

const defaultItems = {
  favorites: {
    title: 'Favorites',
    items: [
      {
        label: 'AirDrop',
        icon: 'airdrop'
      },
      {
        label: 'Recents',
        icon: 'recent'
      },
      {
        label: 'Applications',
        icon: 'application'
      },
      {
        label: 'Movies',
        icon: 'movies'
      },
      { label: 'Music',
        icon: 'music' }
    ]
  }
}

const StyledSidebar = styled('div')`
  backdrop-filter: blur(10px);
  background-color: rgba(67, 66, 71, 1);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  width: 200px;
`
const StyledActionButtons = styled('div')`
  display: flex;
  margin-bottom: 30px;

  * {
    margin-right: 6px;
  }
`

const StyledActionButton = styled('span')`
  background: ${(props) => props.color};
  border-radius: 10px;
  height: 10px;
  width: 10px;
`

type SidebarSectionItems = {
  icon: string,
  label: string
}

type SidebarSectionProps = {
  title: string,
  items: SidebarSectionItems[]
}

const StyledSidebarSectionTitle = styled('span')`
  font-size: 12px;
  color: #adadad;
`

const StyledSidebarSection = styled('div')`
  display: 'flex';
  flex-direction: column;
`

type StyledDirectoryRowProps = {
  active: boolean
}

const StyledDirectoryRow = styled('div')<StyledDirectoryRowProps>(
  { margin: '15px 0px',
    display: 'flex',
    alignItems: 'center',

    span: {
      marginLeft: 10,
      fontSize: 14,
      fontWeight: 400
    } },
  variant({
    prop: 'active',
    variants: {
      true: {
        fontSize: 4,
        lineHeight: 'heading'
      }
    }
  })
)

function SidebarSection({ title, items }: SidebarSectionProps) {
  return (
    <StyledSidebarSection>
      <StyledSidebarSectionTitle>{title}</StyledSidebarSectionTitle>
      {items.map(({ label, icon }, index) => (
        <StyledDirectoryRow active={index === 0}>
          <Icon name={icon} fillColor="#00a4ff" />
          <span>{label}</span>
        </StyledDirectoryRow>
      ))}
    </StyledSidebarSection>
  )
}

function Sidebar() {
  return (
    <StyledSidebar>
      <StyledActionButtons>
        <StyledActionButton color="#ff4e4d" />
        <StyledActionButton color="#ffb900" />
        <StyledActionButton color="#00cd18" />
      </StyledActionButtons>
      <SidebarSection {...defaultItems.favorites} />
    </StyledSidebar>
  )
}

export default Sidebar
