import { API_URL } from '../lib/globales'
import { getUserAuth } from '../utils/api-openEdx'
import useFetchData from './useFetchData'
import qs from 'qs'

export function useActualizarData() {
  const user_id = getUserAuth().userId
  const { fetchData, isloading } = useFetchData()

  function actualizarData({ onSuccess }) {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/api_open_edx/actualizar-data?${qs.stringify({
        user_id,
      })}`,
      msgSuccess: 'Sincronización completada',
      onSuccess,
    })
  }

  return { actualizarData, isloading }
}
