import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'

export function useRemoveExamen({ onSuccess }) {
  const { response, isloading, fetchData } = useFetchData()

  function removeExamen({ examen_id }) {
    fetchData({
      method: 'DELETE',
      url: `${API_URL()}/examen/${examen_id}`,
      msgSuccess: 'Examen eliminado correctamente',
      onSuccess,
    })
  }

  return { response, isloading, removeExamen }
}
