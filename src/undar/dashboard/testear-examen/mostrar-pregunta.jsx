import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ButtonPrimary from '../../components/buttons/button-primary'
import { FaFlag } from 'react-icons/fa'
import { FaCircleChevronRight } from 'react-icons/fa6'
import Counter from './components/counter/counter'
import Pregunta from './pregunta'
import { tiposExamen } from '../../lib/globales'
import { socket } from '../../utils/socket'
import { getUserAuth } from '../../utils/api-openEdx'
import { useLocation } from 'react-router'

const MostrarPregunta = ({
  pregunta,
  examenActual,
  setExamenActual,
  onFinalizarPregunta,
  onFinalizarExamen,
  onSelectRespuesta,
}) => {
  const location = useLocation()
  const path = location.pathname

  const preguntas_no_resueltas = examenActual.preguntas.filter(
    pregunta_aux =>
      !examenActual.preguntas_resueltas
        .map(p => p.id)
        .includes(pregunta_aux.id) && pregunta_aux.id !== pregunta.id
  )

  const user_id = getUserAuth().userId

  function handleFinalizarExamen() {
    onFinalizarPregunta?.({
      respuesta_id: examenActual.pregunta_actual.respuesta_id,
    })
    onFinalizarExamen?.()
    setExamenActual(null)
  }

  function handleSiguientePregunta(pregunta_ejecucion_actual_id) {
    const siguiente = preguntas_no_resueltas[0]
    if (!siguiente) return handleFinalizarExamen()

    onFinalizarPregunta?.({
      siguiente,
      respuesta_id: examenActual.pregunta_actual.respuesta_id,
    })

    setExamenActual(prev => ({
      ...prev,
      pregunta_actual: {
        ...siguiente,
        inicio: Date.now(),
        respuesta_id: null,
        pregunta_ejecucion_actual_id: pregunta_ejecucion_actual_id,
      },
      preguntas_resueltas: [
        ...prev.preguntas_resueltas,
        {
          id: pregunta.id,
          respuesta_id: examenActual.pregunta_actual.respuesta_id,
        },
      ],
    }))
  }

  function handleChangeRespuestaId(respuestaId) {
    setExamenActual(prev => ({
      ...prev,
      pregunta_actual: {
        ...prev.pregunta_actual,
        respuesta_id: respuestaId,
      },
    }))
    onSelectRespuesta?.(respuestaId)
  }

  useEffect(() => {
    function onSiguientePregunta({ ejecucionesExamen }) {
      const ejecucion_examen = ejecucionesExamen.find(
        ejecucion => ejecucion?.alumno_id == user_id
      )
      handleSiguientePregunta(ejecucion_examen?.pregunta_ejecucion_actual_id)
    }

    function onFinalizarExamen() {
      handleFinalizarExamen()
    }

    socket.on('examen-siguiente-pregunta', onSiguientePregunta)
    socket.on('finalizar-examen', onFinalizarExamen)

    return () => {
      socket.off('examen-siguiente-pregunta', onSiguientePregunta)
      socket.off('finalizar-examen', onFinalizarExamen)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {pregunta.duracion && (
        <Counter pregunta={pregunta} onComplete={handleSiguientePregunta} />
      )}
      <div className='flex flex-col gap-2 text-center justify-center items-center'>
        <div className='w-full flex justify-between'>
          <div className='flex flex-col text-left opacity-70'>
            <h1 className='text-3xl font-bold'>{examenActual.title}</h1>
            <h2 className='text font-semibold text-gray-500 -mt-2'>
              {examenActual.curso}
            </h2>
          </div>
          {(examenActual?.tipo_examen === tiposExamen.Async ||
            path.includes('testear-examen')) &&
            (preguntas_no_resueltas.length ? (
              <ButtonPrimary
                onClick={handleSiguientePregunta}
                className='animate-bounce animate-ease-in-out'
              >
                <FaCircleChevronRight />
                Siguiente Pregunta
              </ButtonPrimary>
            ) : (
              <ButtonPrimary
                variant='danger'
                onClick={handleFinalizarExamen}
                className='animate-bounce animate-ease-in-out'
              >
                <FaFlag />
                Finalizar Examen
              </ButtonPrimary>
            ))}
        </div>
        <Pregunta
          pregunta={pregunta}
          onChangeRespuestaId={handleChangeRespuestaId}
        />
      </div>
    </>
  )
}

MostrarPregunta.defaultProps = {}

MostrarPregunta.propTypes = {
  pregunta: PropTypes.object.isRequired,
  examenActual: PropTypes.object.isRequired,
  setExamenActual: PropTypes.func.isRequired,
  onFinalizarPregunta: PropTypes.func,
  onSelectRespuesta: PropTypes.func,
}

export default MostrarPregunta
