import React from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'
import { useAtom } from 'jotai'

import Icon from 'components/Icon'
import { directoriesAtom } from 'components/FinderCanvas'
import { currentDirectory, directoryDerivedState } from 'components/Directory'

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
  icon?: string,
  label?: string,
  id?: string
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
    padding: '0px 10px',

    span: {
      marginLeft: 10,
      fontSize: 14,
      fontWeight: 400
    } },
  variant({
    prop: 'active',
    variants: {
      true: {
        background: '#59595a',
        borderRadius: 5,
        padding: '6px 10px'
      }
    }
  })
)

function DirectoryRow({ label, id, icon }: SidebarSectionItems) {
  const [ { label: directoryLabel } ] = useAtom(directoryDerivedState({ id: id! }))

  return (
    <StyledDirectoryRow active={label === currentDirectory} key={icon}>
      <Icon name={icon!} fillColor="#00a4ff" />
      <span>{label || directoryLabel}</span>
    </StyledDirectoryRow>
  )
}

function SidebarSection({ title, items }: SidebarSectionProps) {
  return (
    <StyledSidebarSection>
      <StyledSidebarSectionTitle>{title}</StyledSidebarSectionTitle>
      {items.map(({ label, icon = 'directory', id }) => (
        <DirectoryRow id={id} icon={icon} label={label} />
      ))}
    </StyledSidebarSection>
  )
}

const SidebarSectionWrapper = styled('div')`
  height: auto;
  overflow-y: scroll;
`

function Sidebar() {
  const [ directories ] = useAtom(directoriesAtom)

  const directoriesNavItems = directories.map((directory) => ({ id: directory }))

  return (
    <StyledSidebar>
      <StyledActionButtons>
        <StyledActionButton color="#ff4e4d" />
        <StyledActionButton color="#ffb900" />
        <StyledActionButton color="#00cd18" />
      </StyledActionButtons>
      <SidebarSectionWrapper>

        <SidebarSection {...defaultItems.favorites} />
        <SidebarSection title={currentDirectory} items={directoriesNavItems} />
      </SidebarSectionWrapper>
    </StyledSidebar>
  )
}

export default Sidebar
