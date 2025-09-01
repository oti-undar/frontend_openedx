import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'

export function useFinalizarExamen() {
  const { response, isloading, fetchData } = useFetchData()

  function finalizarExamen({ ejecucion_examen_id, onSuccess }) {
    fetchData({
      method: 'POST',
      url: `${API_URL()}/ejecucion_examen/${ejecucion_examen_id}`,
      data: {
        fin_examen: new Date(),
      },
      onSuccess,
    })
  }

  return { response, isloading, finalizarExamen }
}
