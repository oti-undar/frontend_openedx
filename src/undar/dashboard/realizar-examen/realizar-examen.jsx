import React, { useEffect, useState } from 'react'
import { getUserAuth } from '../../utils/api-openEdx'
import useFetchData from '../../hooks/useFetchData'
import { API_URL, tiposExamen } from '../../lib/globales'
import InicioExamen from '../testear-examen/inicio-examen'
import MostrarPregunta from '../testear-examen/mostrar-pregunta'
import Loader from '../../components/layout/components/loader'
import Bloqueado from '../../components/layout/components/bloqueado'
import { useCreateEjecucionExamen } from './hooks/create-ejecucion-examen'
import { useGetEjecucionExamen } from './hooks/get-ejecucion-examen'
import { useFinalizarPreguntaExamen } from './hooks/finalizar-pregunta-examen'
import { useFinalizarExamen } from './hooks/finalizar-examen'
import { useNavigate, useParams } from 'react-router'
import { useFinalizarPreguntaExamenRespuesta } from './hooks/finalizar-pregunta-examen-respuesta'
import { useSearchParams } from 'react-router-dom'
import { useSocket } from '../../hooks/use-socket'

const RealizarExamen = () => {
  const { id: examen_id } = useParams()
  const [searchParams] = useSearchParams()
  const user_id_alumno = searchParams.get('user_id')
  const navigate = useNavigate()
  const socket = useSocket()

  const user_id = getUserAuth().userId

  const { response: test, isloading, fetchData } = useFetchData()

  const [examenActual, setExamenActual] = useState({
    preguntas: test?.preguntas,
    fin_examen: null,
    pregunta_actual: null,
    preguntas_resueltas: [],
    ejecucion_examen_id: null,
  })

  const { getEjecucionExamen, isloading: isloadingEjecucion } =
    useGetEjecucionExamen({ user_id_alumno })

  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/examen/${examen_id}?filters=${encodeURIComponent(
        JSON.stringify({
          state: { name: 'Disponible' },
          curso: {
            usuarios: {
              some: {
                user_id,
                is_instructor: user_id_alumno ? true : false,
              },
            },
          },
        })
      )}`,
      onSuccess: data => {
        setExamenActual(prev => ({
          ...prev,
          preguntas: data.preguntas,
          tipo_examen: data.tipo_examen,
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
          tipo_examen: data.tipo_examen,
        }))
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examen_id, user_id])

  const { createEjecucionExamen } = useCreateEjecucionExamen()
  const { finalizarPreguntaExamen } = useFinalizarPreguntaExamen()
  const { finalizarPreguntaExamenRespuesta } =
    useFinalizarPreguntaExamenRespuesta()
  const { finalizarExamen, isloading: isloadingFinalizarExamen } =
    useFinalizarExamen()

  useEffect(() => {
    if (!socket) return

    if (examen_id) socket.emit('join_room', examen_id)
  }, [examen_id, socket])

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
          onInitExamen={() => {
            if (examenActual.tipo_examen === tiposExamen.Async)
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
          }}
        />
      ) : (
        <MostrarPregunta
          pregunta={examenActual.pregunta_actual}
          examenActual={examenActual}
          setExamenActual={setExamenActual}
          onSelectRespuesta={respuesta_id => {
            finalizarPreguntaExamenRespuesta({
              pregunta_ejecucion_actual_id:
                examenActual.pregunta_actual.pregunta_ejecucion_actual_id,
              respuesta_id,
            })
          }}
          onFinalizarPregunta={({ siguiente, respuesta_id } = {}) => {
            if (examenActual.tipo_examen === tiposExamen.Async)
              finalizarPreguntaExamen({
                examen_id,
                pregunta_ejecucion_actual_id:
                  examenActual.pregunta_actual.pregunta_ejecucion_actual_id,
                respuesta_id,
                siguiente,
                onSuccess: data => {
                  setExamenActual(prev => ({
                    preguntas: prev.preguntas,
                    fin_examen: data.fin_examen,
                    pregunta_actual: {
                      ...data.pregunta_ejecucion_actual.pregunta,
                      inicio: new Date(
                        data.pregunta_ejecucion_actual.inicio
                      ).getTime(),
                      pregunta_ejecucion_actual_id:
                        data.pregunta_ejecucion_actual.id,
                    },
                    preguntas_resueltas: data.preguntas_resueltas.map(p => ({
                      id: p.pregunta.id,
                      respuesta_id: p.respuesta_id,
                    })),
                    ejecucion_examen_id: data.id,
                    tipo_examen: data.tipo_examen,
                  }))
                },
              })
          }}
          onFinalizarExamen={() => {
            if (
              examenActual.tipo_examen === tiposExamen.Async ||
              examenActual.tipo_examen === tiposExamen.Solo
            )
              finalizarExamen({
                ejecucion_examen_id: examenActual.ejecucion_examen_id,
                onSuccess: () => navigate('/examen-terminado'),
              })
            else navigate('/examen-terminado')
          }}
        />
      )}
    </div>
  )
}

RealizarExamen.defaultProps = {}

RealizarExamen.propTypes = {}

export default RealizarExamen
