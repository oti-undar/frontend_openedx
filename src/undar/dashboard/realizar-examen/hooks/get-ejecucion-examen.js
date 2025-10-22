import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'
import { getUserAuth } from '../../../utils/api-openEdx'
import qs from 'qs'

export function useGetEjecucionExamen({ user_id_alumno }) {
  const { response, isloading, fetchData } = useFetchData()

  const user_id = getUserAuth().userId

  function getEjecucionExamen({ examen_id, onSuccess }) {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/ejecucion_examen/${examen_id}?${qs.stringify({
        user_id: user_id_alumno ?? user_id,
      })}`,
      onSuccess,
    })
  }

  return { response, isloading, getEjecucionExamen }
}
