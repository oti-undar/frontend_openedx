import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'
import { getUserAuth } from '../../../utils/api-openEdx'
import qs from 'qs'

export function useGetNotaEjecucionExamen({ user_id_alumno } = {}) {
  const { response, isloading, fetchData } = useFetchData()

  const user_id = getUserAuth().userId

  function getNotaEjecucionExamen({ examen_id, onSuccess }) {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/ejecucion_examen/nota/${examen_id}?${qs.stringify({
        user_id: user_id_alumno ?? user_id,
      })}`,
      onSuccess,
    })
  }

  return { response, isloading, getNotaEjecucionExamen }
}
