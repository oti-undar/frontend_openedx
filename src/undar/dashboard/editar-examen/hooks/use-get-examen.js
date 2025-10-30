import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'
import { getUserAuth } from '../../../utils/api-openEdx'

export function useGetExamen({ activo = true } = {}) {
  const { response: examen, isloading, fetchData } = useFetchData()
  const user_id = getUserAuth().userId

  function getExamen({ examen_id, onSuccess }) {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/examen/${examen_id}?filters=${encodeURIComponent(
        JSON.stringify({
          ...(activo ? { state: { name: 'Activo' } } : {}),
          curso: {
            usuarios: {
              some: {
                user_id,
              },
            },
          },
        })
      )}&includes=${encodeURIComponent(
        JSON.stringify({
          rubrica_analitica: {
            include: {
              indicadores: true,
            },
          },
          rubrica_holistica: true,
        })
      )}`,
      onSuccess,
    })
  }

  return {
    examen,
    isloading,
    getExamen,
  }
}
