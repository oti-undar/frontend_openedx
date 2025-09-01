import React from 'react'
import { FaFlag } from 'react-icons/fa6'
import Confetti from 'react-confetti-boom'

const ExamenTerminado = () => {
  return (
    <div className='h-dvh w-dvw flex flex-col gap-8 justify-center items-center -mt-16'>
      <Confetti mode='fall' />
      <FaFlag size={100} className='text-emerald-600' />

      <div className='w-[30%] text-center text-4xl font-bold text-balance'>
        Felicitaciones
      </div>
      <div className='w-[30%] text-center text-xl font-semibold text-balance -mt-8'>
        Has terminado el examen
      </div>
    </div>
  )
}

ExamenTerminado.defaultProps = {}

ExamenTerminado.propTypes = {}

export default ExamenTerminado
