import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import qs from 'qs'
import { getUserAuth } from '../../utils/api-openEdx'
import useFetchData from '../../hooks/useFetchData'
import { API_URL } from '../../lib/globales'
import InicioExamen from '../testear-examen/inicio-examen'
import MostrarPregunta from '../testear-examen/mostrar-pregunta'
import Loader from '../../components/layout/components/loader'
import Bloqueado from '../../components/layout/components/bloqueado'
import { useCreateEjecucionExamen } from './hooks/create-ejecucion-examen'
import { useGetEjecucionExamen } from './hooks/get-ejecucion-examen'
import { useFinalizarPreguntaExamen } from './hooks/finalizar-pregunta-examen'
import { useFinalizarExamen } from './hooks/finalizar-examen'
import { useNavigate } from 'react-router'

const RealizarExamen = () => {
  const { id: examen_id } = useParams()
  const navigate = useNavigate()

  const user_id = getUserAuth().userId

  const { response: test, isloading, fetchData } = useFetchData()

  const [examenActual, setExamenActual] = useState({
    fin_examen: null,
    pregunta_actual: null,
    preguntas_resueltas: [],
    preguntas: test?.preguntas,
    ejecucion_examen_id: null,
  })

  const { getEjecucionExamen, isloading: isloadingEjecucion } =
    useGetEjecucionExamen()

  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/examen/${examen_id}?${qs.stringify({
        filters: {
          state: { name: 'Disponible' },
          curso: {
            usuarios: {
              some: {
                user_id,
              },
            },
          },
        },
      })}`,
      onSuccess: data => {
        setExamenActual(prev => ({
          ...prev,
          preguntas: data.preguntas,
        }))
      },
    })

    getEjecucionExamen({
      examen_id,
      onSuccess: data => {
        if (data.fin_examen) return navigate('/examen-terminado')
        setExamenActual(prev => ({
          preguntas: prev.preguntas,
          fin_examen: data.fin_examen,
          pregunta_actual: {
            ...data.pregunta_ejecucion_actual.pregunta,
            inicio: new Date(data.pregunta_ejecucion_actual.inicio).getTime(),
            pregunta_ejecucion_actual_id: data.pregunta_ejecucion_actual.id,
          },
          preguntas_resueltas: data.preguntas_resueltas.map(p => ({
            id: p.pregunta.id,
            respuesta_id: p.respuesta_id,
          })),
          ejecucion_examen_id: data.id,
        }))
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examen_id, user_id])

  const { createEjecucionExamen } = useCreateEjecucionExamen()
  const { finalizarPreguntaExamen } = useFinalizarPreguntaExamen()
  const { finalizarExamen, isloading: isloadingFinalizarExamen } =
    useFinalizarExamen()

  if (!examen_id)
    return (
      <Bloqueado
        description='Examen no encontrado'
        textButton='Volver al inicio'
        onClick={() => (window.location.href = '/')}
      />
    )
  if (isloading || isloadingEjecucion || isloadingFinalizarExamen)
    return <Loader />
  if (!test)
    return (
      <Bloqueado
        description='Examen no encontrado'
        textButton='Volver al inicio'
        onClick={() => (window.location.href = '/')}
      />
    )

  return (
    <div className='flex flex-col gap-4 size-full py-8 px-12 overflow-y-auto rounded-2xl overflow-x-hidden relative'>
      {!examenActual?.pregunta_actual ? (
        <InicioExamen
          test={test}
          setExamenActual={setExamenActual}
          onInitExamen={() =>
            createEjecucionExamen({
              examen_id,
              pregunta_id: test.preguntas[0].id,
              onSuccess: data => {
                setExamenActual(prev => ({
                  ...prev,
                  pregunta_actual: {
                    ...prev.pregunta_actual,
                    pregunta_ejecucion_actual_id:
                      data.pregunta_ejecucion_actual_id,
                  },
                }))
              },
            })
          }
        />
      ) : (
        <MostrarPregunta
          pregunta={examenActual.pregunta_actual}
          examenActual={examenActual}
          setExamenActual={setExamenActual}
          onFinalizarPregunta={({ siguiente, respuesta_id } = {}) =>
            finalizarPreguntaExamen({
              examen_id,
              pregunta_ejecucion_actual_id:
                examenActual.pregunta_actual.pregunta_ejecucion_actual_id,
              respuesta_id,
              siguiente,
            })
          }
          onFinalizarExamen={() => {
            finalizarExamen({
              ejecucion_examen_id: examenActual.ejecucion_examen_id,
              onSuccess: () => navigate('/examen-terminado'),
            })
          }}
        />
      )}
    </div>
  )
}

RealizarExamen.defaultProps = {}

RealizarExamen.propTypes = {}

export default RealizarExamen
