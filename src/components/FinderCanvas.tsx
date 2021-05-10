/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { atom, useAtom } from 'jotai'
import { closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, LayoutMeasuringStrategy, PointerSensor, useDndContext, useSensor, useSensors } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable'

import Directory, { directories as directoriesState, DirectoryProps, StyledDirectoryWrapper } from 'components/Directory'
import StyledActionBar from 'components/ActionBar'
import { FinderMenu, FinderContextMenu } from 'components/FinderMenu'

const directoriesAtom = atom<string[]>(directoriesState)

const StyledFinderCanvas = styled('div')`
  background-color: #1e1b27;
  flex-wrap: 'wrap';
  flex: 1;
  height: 100%;
  padding: 20px;
`

enum Position {
  Before = -1,
  After = 1,
}

function SortableDirectory({ id, activeIndex, ...props }: DirectoryProps & {activeIndex: number}) {
  const {
    attributes,
    listeners,
    index,
    isDragging,
    isSorting,
    over,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    animateLayoutChanges: () => true
  })

  return (
    <Directory
      innerRef={setNodeRef}
      id={id}
      active={isDragging}
      index={index}
      style={{
        transition: transition!,
        transform: isSorting ? undefined : CSS.Translate.toString(transform)
      }}
      insertPosition={
          over?.id === id
            ? index > activeIndex
              ? Position.After
              : Position.Before
            : undefined
        }
      {...props}
      {...attributes}
      {...listeners}
    />
  )
}

function DirectoryOverlay({
  id,
  items,
  ...props
}: Omit<DirectoryProps, 'index'> & { items: string[] }) {
  const { activatorEvent, over } = useDndContext()
  const isKeyboardSorting = activatorEvent instanceof KeyboardEvent
  const activeIndex = items.indexOf(id)
  const overIndex = over?.id ? items.indexOf(over?.id) : -1

  return (
    <Directory
      id={id}
      {...props}
      clone
      insertPosition={
        isKeyboardSorting && overIndex !== activeIndex
          ? overIndex > activeIndex
            ? Position.After
            : Position.Before
          : undefined
      }
    />
  )
}

function FinderCanvas() {
  const parentRef = useRef(null)
  const [ activeId, setActiveId ] = useState<string | null>(null)
  const [ directories, setDirectories ] = useAtom(directoriesAtom)

  const [ items, setItems ] = useState(() => directories)
  const activeIndex = activeId ? items.indexOf(activeId) : -1

  useEffect(() => {
    setItems(directories)
  }, [ directories ])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 5, tolerance: 10 } })
  )

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id)
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  function handleDragEnd({ over }: DragEndEvent) {
    if (over) {
      const overIndex = directories.indexOf(over.id)

      if (activeIndex !== overIndex) {
        const newIndex = overIndex

        setDirectories((prev) => arrayMove(prev, activeIndex, newIndex))
      }
    }

    setActiveId(null)
  }

  return (
    <>
      <StyledFinderCanvas ref={parentRef} data-testid="canvas">
        <StyledActionBar />

        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          sensors={sensors}
          collisionDetection={closestCenter}
          layoutMeasuring={{ strategy: LayoutMeasuringStrategy.Always }}
        >
          <SortableContext items={items}>
            <StyledDirectoryWrapper data-testid="directory-wrapper">
              {items.map((id, index) => (
                <SortableDirectory
                  id={id}
                  index={index + 1}
                  key={id}
                  data-testid={id}
                  activeIndex={activeIndex}
                  onRemove={() => setItems(
                    (currentItems) => currentItems.filter((itemId) => itemId !== id)
                  )}
                />
              ))}
            </StyledDirectoryWrapper>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <DirectoryOverlay id={activeId} items={items} />
            ) : null}
          </DragOverlay>
        </DndContext>

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

export { directoriesAtom }
