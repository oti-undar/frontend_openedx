import React from 'react'
import PropTypes from 'prop-types'
import ButtonPrimary from '../../components/buttons/button-primary'
import { FaFlag } from 'react-icons/fa'
import { FaCircleChevronRight } from 'react-icons/fa6'
import Counter from './components/counter/counter'
import Pregunta from './pregunta'

const MostrarPregunta = ({ pregunta, examenActual, setExamenActual }) => {
  const preguntas_no_resueltas = examenActual.preguntas.filter(
    pregunta_aux =>
      !examenActual.preguntas_resueltas
        .map(p => p.id)
        .includes(pregunta_aux.id) && pregunta_aux.id !== pregunta.id
  )

  function handleFinalizarExamen() {
    const respuestas = [
      ...examenActual.preguntas_resueltas,
      {
        id: pregunta.id,
        respuesta_id: examenActual.pregunta_actual.respuesta_id,
      },
    ]
    console.log('🚀 ~ file: mostrar-pregunta.jsx:48 ~ respuestas:', respuestas)
    setExamenActual(null)
  }

  function handleSiguientePregunta() {
    const siguiente = preguntas_no_resueltas[0]
    if (!siguiente) return handleFinalizarExamen()

    setExamenActual(prev => ({
      ...prev,
      pregunta_actual: {
        ...siguiente,
        inicio: Date.now(),
        respuesta_id: null,
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
  }

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
          {preguntas_no_resueltas.length ? (
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
          )}
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
}

export default MostrarPregunta
