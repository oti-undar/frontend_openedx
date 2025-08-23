import React from 'react'
import ButtonPrimary from '../../components/buttons/button-primary.jsx'
import { FaHourglassStart } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { API_URL } from '../../lib/globales.js'

const InicioExamen = ({ test, setExamenActual }) => {
  const primeraPregunta = test.preguntas[0]

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
          <p className='text-gray-700 text-justify max-w-xl animate-fade animate-delay-1000 animate-ease-in-out'>
            {test.description}
          </p>

          <div className='mt-8 animate-fade-up animate-delay-[1500ms] animate-ease-in-out'>
            <ButtonPrimary
              className='animate-bounce animate-ease-in-out'
              onClick={() =>
                setExamenActual({
                  fin_examen: null,
                  pregunta_actual: {
                    ...primeraPregunta,
                    respuesta_id: null,
                    inicio: Date.now(),
                  },
                  preguntas_resueltas: [],
                  preguntas: test.preguntas,
                })
              }
            >
              <FaHourglassStart />
              Iniciar Examen
            </ButtonPrimary>
          </div>
        </div>
        <div className='col-span-3'>
          <div className='animate-flip-down animate-ease-in-out animate-delay-1000 flex justify-center w-full'>
            {test.img && (
              <img
                className='max-w-[80%] max-h-[400px] rounded-xl'
                src={`${API_URL()}${test.img}`}
                alt='Imagen de prueba'
              />
            )}
            {test.video && (
              <video className='max-w-[80%] max-h-[400px] rounded-xl' controls>
                <source src={`${API_URL()}${test.video}`} type='video/mp4' />
                Tu navegador no soporta el video.
              </video>
            )}
            {test.audio && (
              <audio className='max-w-[80%] max-h-[400px] rounded-xl' controls>
                <source src={`${API_URL()}${test.audio}`} type='audio/mp3' />
                Tu navegador no soporta el audio.
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
}

export default InicioExamen
