import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { API_URL } from '../../lib/globales'

const Pregunta = ({ onChangeRespuestaId, pregunta }) => {
  return (
    <>
      <div
        className='max-w-[80%] text-5xl font-bold animate-flip-down animate-ease-in-out text-center text-balance'
        key={`p-${pregunta.id}`}
      >
        {pregunta.title}
      </div>
      <div
        className='flex justify-around items-center gap-10 mt-10 w-full'
        key={`a-${pregunta.id}`}
      >
        <div className='grid grid-cols-2 gap-x-8 gap-y-6 animate-flip-down animate-delay-500 animate-ease-in-out'>
          {useMemo(
            () =>
              [...(pregunta.respuestas ?? [])].sort(() => Math.random() - 0.5),
            [pregunta.respuestas]
          ).map((alternativa) => (
            <div key={alternativa.id} className='flex flex-col justify-center'>
              <button
                onClick={() => onChangeRespuestaId(alternativa.id)}
                className={`bg-gray-100 text-lg px-6 py-2 rounded-xl hover:contrast-125 transition-all font-semibold shadow-lg hover:scale-105 active:scale-95 ${
                  alternativa.id === pregunta.respuesta_id
                    ? 'bg-lime-300'
                    : 'bg-yellow-300'
                }`}
              >
                {alternativa.respuesta}
              </button>

              {alternativa.img && (
                <img
                  className='max-w-[500px] max-h-[400px] rounded-xl'
                  src={`${API_URL()}${alternativa.img}`}
                  alt='Imagen de prueba'
                />
              )}
              {alternativa.video && (
                <video
                  className='max-w-[500px] max-h-[400px] rounded-xl'
                  src={`${API_URL()}${alternativa.video}`}
                  controls
                />
              )}
              {alternativa.audio && (
                <audio
                  className='max-w-[500px] max-h-[400px] rounded-xl'
                  src={`${API_URL()}${alternativa.audio}`}
                  controls
                />
              )}
            </div>
          ))}
        </div>

        {(pregunta.img || pregunta.video || pregunta.audio) && (
          <div className='flex justify-center animate-fade-left animate-ease-in-out animate-delay-500'>
            {pregunta.img && (
              <img
                className='max-w-[500px] max-h-[400px] rounded-xl'
                src={`${API_URL()}${pregunta.img}`}
                alt='Imagen de prueba'
              />
            )}
            {pregunta.video && (
              <video
                className='max-w-[500px] max-h-[400px] rounded-xl'
                src={`${API_URL()}${pregunta.video}`}
                alt='Video de prueba'
                controls
              />
            )}
            {pregunta.audio && (
              <audio
                className='max-w-[500px] max-h-[400px] rounded-xl'
                src={`${API_URL()}${pregunta.audio}`}
                controls
                alt='Audio de prueba'
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

Pregunta.defaultProps = {}

Pregunta.propTypes = {
  pregunta: PropTypes.object.isRequired,
  onChangeRespuestaId: PropTypes.func.isRequired,
}

export default Pregunta
