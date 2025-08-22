import React from 'react'
import PropTypes from 'prop-types'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const Counter = ({
  pregunta,
  onComplete,
  size,
  className,
  classNameNumber,
}) => {
  const duracionTotal = pregunta.duracion * 60
  const tiempoRestante = duracionTotal - (Date.now() - pregunta.inicio) / 1000

  return (
    <div
      className={`absolute bottom-5 left-5 z-50 animate-jump-in animate-ease-in-out ${className}`}
      key={pregunta.id}
    >
      <CountdownCircleTimer
        isPlaying
        size={size}
        duration={duracionTotal}
        initialRemainingTime={tiempoRestante}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[duracionTotal, duracionTotal / 2, duracionTotal / 4, 0]}
        onComplete={onComplete}
      >
        {({ elapsedTime, color }) => (
          <span
            className={`text-3xl font-bold ${classNameNumber}`}
            style={{ color }}
          >
            {Math.trunc(duracionTotal - elapsedTime)}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  )
}

Counter.defaultProps = {
  size: 130,
  className: '',
  classNameNumber: '',
}

Counter.propTypes = {
  pregunta: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  classNameNumber: PropTypes.string,
}

export default Counter
