import { MutableRefObject, useEffect } from 'react'

function useClickOutside(ref: MutableRefObject<any>, handler: (e: any) => void) {
  useEffect(
    () => {
      const listener = (event: any) => {
        if (!ref?.current || ref?.current?.contains(event.target)) {
          return
        }
        handler(event)
      }
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    [ ref, handler ]
  )
}

export default useClickOutside
