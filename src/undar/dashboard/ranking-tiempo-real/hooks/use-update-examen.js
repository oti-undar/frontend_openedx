import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'

export default function useUpdateExamen({ examen_id, msgSuccess }) {
  const { fetchData, isloading } = useFetchData()

  function updateExamen({ data, onSuccess }) {
    fetchData({
      method: 'POST',
      url: `${API_URL()}/examen/${examen_id}`,
      data,
      msgSuccess,
      onSuccess,
    })
  }

  return { updateExamen, isloading }
}
