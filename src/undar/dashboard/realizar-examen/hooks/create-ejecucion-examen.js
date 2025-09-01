import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'
import { getUserAuth } from '../../../utils/api-openEdx'

export function useCreateEjecucionExamen() {
  const { response, isloading, fetchData } = useFetchData()

  const user_id = getUserAuth().userId

  function createEjecucionExamen({ examen_id, pregunta_id, onSuccess }) {
    fetchData({
      method: 'POST',
      url: `${API_URL()}/ejecucion_examen`,
      data: {
        examen_id,
        pregunta_id,
        user_id,
      },
      onSuccess,
    })
  }

  return { response, isloading, createEjecucionExamen }
}
