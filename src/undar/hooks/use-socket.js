import { useEffect, useState } from 'react'
import { getSocket } from '../utils/socket'

export function useSocket() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    let isMounted = true
    getSocket().then(s => {
      if (isMounted) setSocket(s)
    })
    return () => {
      isMounted = false
    }
  }, [])

  return socket
}
