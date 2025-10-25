import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import { useSocket } from '../../hooks/use-socket'

const LayoutGlobal = () => {
  const socket = useSocket()
  useEffect(() => {
    if (!socket) return

    const onConnect = () => console.log('Connected')
    const onDisconnect = () => console.log('Disconnected')

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [socket])

  return <Outlet />
}

LayoutGlobal.defaultProps = {}

LayoutGlobal.propTypes = {}

export default LayoutGlobal
