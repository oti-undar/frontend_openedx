import { useEffect, useState } from 'react'
import useFetchData from '../../../hooks/useFetchData'
import { API_URL, states, tiposExamen } from '../../../lib/globales'
import { getUserAuth } from '../../../utils/api-openEdx'

export const includeGetExamenTiempoReal = {
  curso: {
    include: {
      usuarios: {
        select: {
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              username: true,
              examenes_resueltos: {
                select: {
                  examen_id: true,
                  preguntas_resueltas: {
                    select: {
                      pregunta: {
                        select: {
                          puntos: true,
                        },
                      },
                      respuesta: {
                        select: {
                          correcta: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  ejecuciones: {
    select: {
      preguntas_resueltas: {
        select: {
          pregunta_id: true,
        },
      },
    },
    take: 1,
  },
}

export default function useGetExamenTiempoReal({ examen_id }) {
  const { isloading, fetchData } = useFetchData()

  const [examenActual, setExamenActual] = useState()

  const user_id = getUserAuth().userId

  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/examen/${examen_id}?filters=${encodeURIComponent(
        JSON.stringify({
          state: { name: states.Disponible },
          user_id,
          tipo_examen: tiposExamen.Sync,
        })
      )}&includes=${encodeURIComponent(
        JSON.stringify(includeGetExamenTiempoReal)
      )}`,
      onSuccess: setExamenActual,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examen_id, user_id])

  return { examenActual, isloading, setExamenActual }
}
