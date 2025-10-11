import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'
import { getUserAuth } from '../../../utils/api-openEdx'
import qs from 'qs'

export function useGetEjecucionesExamen() {
  const { response, isloading, fetchData } = useFetchData()

  const user_id = getUserAuth().userId

  function getEjecucionesExamen({ examen_id, onSuccess }) {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/ejecucion_examen?${qs.stringify({
        examen_id,
        user_id,
      })}`,
      onSuccess,
    })
  }

  return { response, isloading, getEjecucionesExamen }
}
