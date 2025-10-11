import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'

export function useGetRubrica({ tipo, onSuccess }) {
  const { response, isloading, fetchData } = useFetchData()

  function getRubrica({ examen_id }) {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/rubrica/${tipo}/${examen_id}`,
      onSuccess,
    })
  }

  return { response, isloading, getRubrica }
}
