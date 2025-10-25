import React, { useEffect } from 'react'
import RankingRow from './components/cards/ranking-row'
import ButtonPrimary from '../../components/buttons/button-primary'
import { FaCircleChevronRight, FaFlag } from 'react-icons/fa6'
import { useParams, useNavigate } from 'react-router'
import Bloqueado from '../../components/layout/components/bloqueado'
import Loader from '../../components/layout/components/loader'
import useGetExamenTiempoReal from './hooks/use-get-examen-tiempo-real'
import Counter from '../testear-examen/components/counter/counter'
import useUpdateExamen from './hooks/use-update-examen'
import { getUserAuth } from '../../utils/api-openEdx'
import { states } from '../../lib/globales'
import { useSocket } from '../../hooks/use-socket'

const RankingTiempoReal = () => {
  const { id: examen_id } = useParams()
  const navigate = useNavigate()
  const socket = useSocket()

  const user_id = getUserAuth().userId

  const { examenActual, setExamenActual, isloading } = useGetExamenTiempoReal({
    examen_id,
  })

  const preguntas_resueltas =
    examenActual?.ejecuciones?.[0]?.preguntas_resueltas?.map(
      pregunta_resuelta => pregunta_resuelta.pregunta_id
    )
  const preguntas_no_resueltas = examenActual?.preguntas?.filter(
    pregunta => !preguntas_resueltas?.includes(pregunta.id)
  )

  const puntosTotales =
    examenActual?.preguntas?.reduce(
      (total, pregunta) => total + pregunta.puntos,
      0
    ) ?? 1

  const alumnos = examenActual?.curso?.usuarios
    ?.filter(usuario => usuario.user.id !== user_id)
    ?.map(usuario => {
      const examen_resuelto_actual = usuario.user.examenes_resueltos?.find(
        examen => examen.examen_id === examen_id
      )
      const puntos_obtenidos =
        examen_resuelto_actual?.preguntas_resueltas?.reduce(
          (total, pregunta_resuelta) =>
            total +
            (pregunta_resuelta?.respuesta?.correcta
              ? pregunta_resuelta?.pregunta?.puntos ?? 0
              : 0),
          0
        ) ?? 0

      const nota = (puntos_obtenidos * 20) / puntosTotales
      return {
        id: usuario.user.id,
        nombre: usuario.user.first_name,
        apellido: usuario.user.last_name,
        username: usuario.user.username,
        nota,
      }
    })

  const alumnosOrdenados = alumnos?.sort((a, b) => b.nota - a.nota)
  const primeros3 = alumnosOrdenados?.slice(0, 3)
  const otros = alumnosOrdenados?.slice(3)

  const { updateExamen, isloading: isloadingUpdate } = useUpdateExamen({
    examen_id,
  })

  useEffect(() => {
    if (!socket) return

    if (examen_id) socket.emit('join_room', examen_id)
  }, [examen_id, socket])

  useEffect(() => {
    if (!socket) return

    function onInitExamen() {
      updateExamen({
        onSuccess: setExamenActual,
      })
    }

    function onSiguientePregunta() {
      updateExamen({
        onSuccess: setExamenActual,
      })
    }

    function onFinalizarExamen({ examen_id: examen_actual_id }) {
      navigate(`/ranking-final-examen/${examen_actual_id}`)
    }

    socket.on('init-examen', onInitExamen)
    socket.on('examen-siguiente-pregunta', onSiguientePregunta)
    socket.on('finalizar-examen', onFinalizarExamen)

    return () => {
      socket.off('init-examen', onInitExamen)
      socket.off('examen-siguiente-pregunta', onSiguientePregunta)
      socket.off('finalizar-examen', onFinalizarExamen)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  if (!examen_id)
    return (
      <Bloqueado
        description='Examen no encontrado'
        textButton='Volver al inicio'
        onClick={() => (window.location.href = '/')}
      />
    )
  if (isloading || isloadingUpdate) return <Loader />
  if (!examenActual)
    return (
      <Bloqueado
        description='Examen no encontrado'
        textButton='Volver al inicio'
        onClick={() => (window.location.href = '/')}
      />
    )

  return (
    <div className='flex flex-col gap-4 size-full py-8 px-12 overflow-y-auto rounded-2xl overflow-x-hidden relative'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-2 justify-center'>
          <h1 className='text-5xl font-bold animate-fade-right animate-ease-in-out'>
            {examenActual.title}
          </h1>
          <h2 className='text-xl font-semibold text-gray-500 -mt-2 animate-fade-left animate-delay-500 animate-ease-in-out'>
            {examenActual.curso.name}
          </h2>
        </div>
        <div className='flex items-center gap-4 -mt-4'>
          {examenActual?.pregunta_actual_sync_id ? (
            <>
              {examenActual?.pregunta_actual_sync?.duracion && (
                <Counter
                  size={70}
                  className='relative -mb-8 mr-8'
                  classNameNumber='!text-base'
                  pregunta={examenActual?.pregunta_actual_sync}
                />
              )}
              {preguntas_no_resueltas.length ? (
                <ButtonPrimary
                  onClick={() => {
                    updateExamen({
                      data: {
                        pregunta_actual_sync_id:
                          preguntas_no_resueltas?.[0]?.id,
                      },
                      onSuccess: data => {
                        setExamenActual(data)
                        socket.emit('message_room', {
                          room: examen_id,
                          event: 'examen-siguiente-pregunta',
                          data: {
                            examen_id,
                            siguiente_pregunta_id:
                              preguntas_no_resueltas?.[0]?.id,
                          },
                        })
                      },
                    })
                  }}
                >
                  <FaCircleChevronRight />
                  Siguiente Pregunta
                </ButtonPrimary>
              ) : (
                <ButtonPrimary
                  variant='danger'
                  onClick={() => {
                    updateExamen({
                      data: {
                        pregunta_actual_sync: {
                          disconnect: true,
                        },
                        final_examen: Date.now(),
                        state: {
                          connect: {
                            name: states.Finalizado,
                          },
                        },
                      },
                      onSuccess: () => {
                        const examen_actual_id = examenActual.id
                        setExamenActual(undefined)
                        socket.emit('message_room', {
                          room: examen_actual_id,
                          event: 'examen-siguiente-pregunta',
                          data: {
                            examen_id: examen_actual_id,
                          },
                        })
                        socket.emit('message_room', {
                          room: examen_actual_id,
                          event: 'finalizar-examen',
                          data: {
                            examen_id: examen_actual_id,
                          },
                        })
                      },
                    })
                  }}
                >
                  <FaFlag />
                  Finalizar Examen
                </ButtonPrimary>
              )}
            </>
          ) : (
            <ButtonPrimary
              onClick={() => {
                updateExamen({
                  data: {
                    pregunta_actual_sync_id: examenActual?.preguntas?.[0]?.id,
                  },
                  onSuccess: data => {
                    setExamenActual(data)
                    socket.emit('message_room', {
                      room: examen_id,
                      event: 'init-examen',
                      data: {
                        pregunta_actual_sync_id:
                          examenActual?.preguntas?.[0]?.id,
                        examen_id,
                        user_id,
                      },
                    })
                  },
                })
              }}
            >
              <FaCircleChevronRight />
              Iniciar Examen
            </ButtonPrimary>
          )}
        </div>
      </div>
      {examenActual?.pregunta_actual_sync_id && (
        <div className='flex flex-col'>
          <div className='flex font-medium text-gray-700 mt-1 gap-4 text-xl'>
            <div className=''>Pregunta Actual:</div>
            <div className='font-bold'>
              {examenActual?.pregunta_actual_sync?.title}
            </div>
          </div>
          <div className='text-sm'>
            {examenActual?.pregunta_actual_sync?.description}Hola
          </div>
        </div>
      )}
      <div className='flex gap-6 mt-6 items-center flex-1 overflow-hidden w-full justify-around'>
        <div
          className='flex flex-col gap-6 w-fit px-5 justify-center items-center h-full overflow-y-auto rounded-2xl overflow-x-hidden'
          style={{ zoom: 1.5 }}
        >
          {primeros3.map((alumno, index) => (
            <RankingRow
              key={alumno.id}
              name={alumno.nombre}
              lastName={alumno.apellido}
              username={alumno.username}
              number={index + 1}
            />
          ))}
        </div>
        <div className='flex flex-col gap-6 w-fit px-5 items-center h-full overflow-y-auto rounded-2xl overflow-x-hidden'>
          {otros.map((alumno, index) => (
            <RankingRow
              key={alumno.id}
              name={alumno.nombre}
              lastName={alumno.apellido}
              username={alumno.username}
              number={index + 4}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

RankingTiempoReal.defaultProps = {}

RankingTiempoReal.propTypes = {}

export default RankingTiempoReal
