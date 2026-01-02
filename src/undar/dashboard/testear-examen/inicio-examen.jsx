import React, { useEffect } from 'react'
import ButtonPrimary from '../../components/buttons/button-primary.jsx'
import { FaHourglassStart } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { API_URL, tiposExamen } from '../../lib/globales.js'
import { getUserAuth } from '../../utils/api-openEdx.js'
import { useLocation } from 'react-router'
import { useSocket } from '../../hooks/use-socket.js'
import { useLanguage } from '../../../context/useLanguaje.js'

const InicioExamen = ({ test, setExamenActual, onInitExamen }) => {
  const location = useLocation()
  const path = location.pathname
  const socket = useSocket()
  const { t } = useLanguage()

  const primeraPregunta = test.preguntas[0]

  const user_id = getUserAuth().userId

  function handleIniciarExamen(pregunta_ejecucion_actual_id) {
    setExamenActual((prev) => ({
      ...prev,
      fin_examen: null,
      pregunta_actual: {
        ...primeraPregunta,
        respuesta_id: null,
        inicio: Date.now(),
        pregunta_ejecucion_actual_id: pregunta_ejecucion_actual_id,
      },
      preguntas_resueltas: [],
      preguntas: test.preguntas,
    }))
    onInitExamen?.()
  }

  useEffect(() => {
    if (!socket) return

    function onInitExamen({ ejecucionesExamen }) {
      const ejecucion_examen = ejecucionesExamen.find(
        (ejecucion) => ejecucion.alumno_id == user_id
      )
      handleIniciarExamen(ejecucion_examen?.pregunta_ejecucion_actual_id)
    }

    socket.on('init-examen', onInitExamen)

    return () => {
      socket.off('init-examen', onInitExamen)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return (
    <div className='flex flex-col gap-2 text-center'>
      <h1 className='text-5xl font-bold animate-fade-right animate-ease-in-out'>
        {test.title}
      </h1>
      <h2 className='text-xl font-semibold text-gray-500 -mt-2 animate-fade-left animate-delay-500 animate-ease-in-out'>
        {test.curso.name}
      </h2>
      <div className='grid grid-cols-5 gap-4 mt-6'>
        <div className='col-span-2 flex-col'>
          <p className='text-gray-700 text-justify max-w-xl animate-fade animate-delay-1000 animate-ease-in-out whitespace-pre-line'>
            {test.description}
          </p>

          <div className='mt-8 animate-fade-up animate-delay-[1500ms] animate-ease-in-out'>
            {(test.tipo_examen === tiposExamen.Async ||
              test.tipo_examen === tiposExamen.Alumno ||
              path.includes('testear-examen')) && (
              <ButtonPrimary
                className='animate-bounce animate-ease-in-out'
                onClick={() => handleIniciarExamen()}
              >
                <FaHourglassStart />
                {t.studentExam.startExam}
              </ButtonPrimary>
            )}
          </div>
        </div>
        <div className='col-span-3'>
          <div className='animate-flip-down animate-ease-in-out animate-delay-1000 flex justify-center w-full'>
            {test.img && (
              <img
                className='max-w-[80%] max-h-[400px] rounded-xl'
                src={`${API_URL()}${test.img}`}
                alt={t.studentExam.testImage}
              />
            )}
            {test.video && (
              <video className='max-w-[80%] max-h-[400px] rounded-xl' controls>
                <source src={`${API_URL()}${test.video}`} type='video/mp4' />
                {t.studentExam.videoNotSupported}
              </video>
            )}
            {test.audio && (
              <audio className='max-w-[80%] max-h-[400px] rounded-xl' controls>
                <source src={`${API_URL()}${test.audio}`} type='audio/mp3' />
                {t.studentExam.audioNotSupported}
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

InicioExamen.defaultProps = {}

InicioExamen.propTypes = {
  test: PropTypes.object.isRequired,
  setExamenActual: PropTypes.func.isRequired,
  onInitExamen: PropTypes.func,
}

export default InicioExamen
