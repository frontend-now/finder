import ReactDOM from 'react-dom'
import type { PropsWithChildren } from 'react'

function Portal({
  children,
  target = document.body
}: PropsWithChildren<{ target?: HTMLElement | null}>) {
  if (!target) {
    return null
  }

  return (
    ReactDOM.createPortal(children, target)
  )
}

export default Portal
