import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { Provider } from 'jotai'

import FinderCanvas from 'components/FinderCanvas'
import { directories } from 'components/Directory'

describe('contextMenu is displayed correctly', () => {
  it('contextMenu appears on right click', async () => {
    const { findByTestId, getByText } = render(
      <FinderCanvas />
    )

    const eventNode = await findByTestId('canvas')
    await waitFor(() => fireEvent.contextMenu(eventNode))

    const contextMenuItem = getByText('Get Info')

    expect(contextMenuItem).not.toBeNull()
  })
})

describe('Add a new directory', () => {
  it('Adds a new directory', async () => {
    const { findByTestId } = render(
      <Provider>
        <FinderCanvas />
      </Provider>
    )
    const DEFAULT_DIRECTORIES_LENGTH = directories.length

    const createDirectory = async () => {
      const eventNode = await findByTestId('canvas')
      await waitFor(() => fireEvent.contextMenu(eventNode))
      const contextMenuItem = await findByTestId('new-folder')
      await waitFor(() => contextMenuItem.click())
    }

    // Add two new diretories
    await createDirectory()
    await createDirectory()

    const directoryWrapperNode = await findByTestId('directory-wrapper')

    expect(directoryWrapperNode.childElementCount).toEqual(DEFAULT_DIRECTORIES_LENGTH + 2)
  })
})

describe('Remove a directory', () => {
  it('Decrease directory count by 1 when removing directory', async () => {
    const { findByTestId, getByText } = render(
      <Provider>
        <FinderCanvas />
      </Provider>
    )
    const DEFAULT_DIRECTORIES_LENGTH = directories.length

    const directoryWrapperNode = await findByTestId('directory-wrapper')
    const firstDirectory = directoryWrapperNode.firstChild?.firstChild as HTMLElement

    await waitFor(() => fireEvent.contextMenu(firstDirectory))
    const contextMenuItem = await findByTestId('delete-folder')
    await waitFor(() => contextMenuItem.click())

    expect(directoryWrapperNode.childElementCount).toEqual(DEFAULT_DIRECTORIES_LENGTH - 1)
  })

  it('Remove deleted atom from store', async () => {
    const { findByTestId, queryByTestId } = render(
      <Provider>
        <FinderCanvas />
      </Provider>
    )
    const directoryWrapperNode = await findByTestId('directory-wrapper')
    const firstDirectory = directoryWrapperNode.firstChild?.firstChild as HTMLElement
    const firstDirectoryId = firstDirectory.dataset!.testid!

    await waitFor(() => fireEvent.contextMenu(firstDirectory))
    const contextMenuItem = await findByTestId('delete-folder')
    await waitFor(() => contextMenuItem.click())

    const removedItem = await queryByTestId(firstDirectoryId)

    expect(removedItem).toBeNull()
  })
})
