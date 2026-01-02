import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { API_URL, tiposExamen } from '../../lib/globales'
import { useLanguage } from '../../../context/useLanguaje'

const Pregunta = ({
  onChangeRespuestaId,
  pregunta,
  tipoExamen,
  retroalimentacion,
  onChangeRetroalimentacion,
}) => {
  const { t } = useLanguage()

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
          {useMemo(() => {
            const respuestas = [...(pregunta.respuestas ?? [])]
            return tipoExamen === tiposExamen.Solo ||
              tipoExamen === tiposExamen.Alumno
              ? respuestas
              : respuestas.sort(() => Math.random() - 0.5)
          }, [pregunta.respuestas, tipoExamen]).map((alternativa) => (
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
                  alt={t.studentExam.testImage}
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
                alt={t.studentExam.testImage}
              />
            )}
            {pregunta.video && (
              <video
                className='max-w-[500px] max-h-[400px] rounded-xl'
                src={`${API_URL()}${pregunta.video}`}
                alt={t.studentExam.testVideo}
                controls
              />
            )}
            {pregunta.audio && (
              <audio
                className='max-w-[500px] max-h-[400px] rounded-xl'
                src={`${API_URL()}${pregunta.audio}`}
                controls
                alt={t.studentExam.testAudio}
              />
            )}
          </div>
        )}
        {(tipoExamen === tiposExamen.Solo ||
          tipoExamen === tiposExamen.Alumno) && (
          <div className='flex flex-col gap-2 w-full max-w-2xl animate-fade-left animate-ease-in-out animate-delay-500'>
            <label
              htmlFor='retroalimentacion'
              className='text-lg font-semibold text-gray-700'
            >
              {tipoExamen === tiposExamen.Alumno
                ? t.testExam.whatToImprove
                : t.testExam.observation}
            </label>
            <textarea
              id='retroalimentacion'
              name='retroalimentacion'
              value={retroalimentacion || ''}
              onChange={(e) => onChangeRetroalimentacion?.(e.target.value)}
              placeholder={t.testExam.placeholder}
              className='w-full min-h-[120px] px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-yellow-400 focus:outline-none resize-y transition-all shadow-md'
              rows={4}
            />
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
  tipoExamen: PropTypes.string,
  retroalimentacion: PropTypes.string,
  onChangeRetroalimentacion: PropTypes.func,
}

export default Pregunta
