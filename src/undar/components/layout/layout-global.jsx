import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import { socket } from '../../utils/socket'

const LayoutGlobal = () => {
  useEffect(() => {
    function onConnect() {
      console.log('Connected')
    }

    function onDisconnect() {
      console.log('Disconnected')
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return <Outlet />
}

LayoutGlobal.defaultProps = {}

LayoutGlobal.propTypes = {}

export default LayoutGlobal
