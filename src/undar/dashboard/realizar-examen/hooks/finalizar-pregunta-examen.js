import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'
import { getUserAuth } from '../../../utils/api-openEdx'

export function useFinalizarPreguntaExamen() {
  const { response, isloading, fetchData } = useFetchData()

  const user_id = getUserAuth().userId

  function finalizarPreguntaExamen({
    examen_id,
    pregunta_ejecucion_actual_id,
    respuesta_id,
    siguiente,
    onSuccess,
  }) {
    fetchData({
      method: 'POST',
      url: `${API_URL()}/ejecucion_examen/pregunta/${pregunta_ejecucion_actual_id}`,
      data: {
        respuesta_id,
        final: new Date(),
        ...(siguiente
          ? {
              nueva_pregunta_actual: {
                examen_id,
                pregunta_id: siguiente.id,
                user_id,
              },
            }
          : {}),
      },
      onSuccess,
    })
  }

  return { response, isloading, finalizarPreguntaExamen }
}
