import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'

export function useFinalizarPreguntaExamenRespuesta() {
  const { response, isloading, fetchData } = useFetchData()

  function finalizarPreguntaExamenRespuesta({
    pregunta_ejecucion_actual_id,
    respuesta_id,
    onSuccess,
  }) {
    fetchData({
      method: 'POST',
      url: `${API_URL()}/ejecucion_examen/pregunta-respuesta/${pregunta_ejecucion_actual_id}`,
      data: {
        respuesta_id,
      },
      onSuccess,
    })
  }

  return { response, isloading, finalizarPreguntaExamenRespuesta }
}
