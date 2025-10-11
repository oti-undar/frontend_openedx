import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'

export function useRemoveRubrica({ onSuccess, tipo }) {
  const { response, isloading, fetchData } = useFetchData()

  function removeRubrica({ examen_id }) {
    fetchData({
      method: 'DELETE',
      url: `${API_URL()}/rubrica/${tipo}/${examen_id}`,
      msgSuccess: 'Rubrica eliminada correctamente',
      onSuccess,
    })
  }

  return { response, isloading, removeRubrica }
}
