import { useEffect } from 'react'
import { API_URL } from '../lib/globales'
import useFetchData from './useFetchData'

export const useGetStates = () => {
  const { response, fetchData } = useFetchData()
  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL}/state`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { estados: response }
}
