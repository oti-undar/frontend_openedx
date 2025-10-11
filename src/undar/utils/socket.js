import { io } from 'socket.io-client'
import { API_URL } from '../lib/globales'

const URL = API_URL()

export const socket = io(URL)
