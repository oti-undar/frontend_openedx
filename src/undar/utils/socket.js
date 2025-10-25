import { io } from 'socket.io-client'
import { API_URL } from '../lib/globales'

let socketInstance = null

function waitForAPIUrl(retries = 20, delay = 50) {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const check = () => {
      console.log('🚀 ~ file: socket.js:14 ~ attempts:', attempts)
      const url = API_URL()
      if (url) resolve(url)
      else {
        attempts++
        if (attempts >= retries) reject(new Error('API_URL no disponible'))
        else setTimeout(check, delay)
      }
    }
    check()
  })
}

export async function getSocket() {
  if (socketInstance) return socketInstance
  const url = await waitForAPIUrl()
  socketInstance = io(url)
  return socketInstance
}
