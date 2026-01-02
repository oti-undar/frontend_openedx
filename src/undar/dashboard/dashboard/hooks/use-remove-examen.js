import { useLanguage } from '../../../../context/useLanguaje'
import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'

export function useRemoveExamen({ onSuccess }) {
  const { response, isloading, fetchData } = useFetchData()
  const { t } = useLanguage()

  function removeExamen({ examen_id }) {
    fetchData({
      method: 'DELETE',
      url: `${API_URL()}/examen/${examen_id}`,
      msgSuccess: t.dashboard.messages.successDelete,
      onSuccess,
    })
  }

  return { response, isloading, removeExamen }
}
