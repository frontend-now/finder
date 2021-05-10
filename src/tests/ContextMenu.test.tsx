import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'

import FinderCanvas from 'components/FinderCanvas'

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
