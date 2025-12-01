import React, { useEffect } from 'react'
import { FaFlag } from 'react-icons/fa6'
import Confetti from 'react-confetti-boom'
import ButtonPrimary from '../../components/buttons/button-primary'
import { useSearchParams } from 'react-router-dom'
import { useGetNotaEjecucionExamen } from './hooks/get-nota-ejecucion-examen'
import AvatarMenu from './components/avatar-menu'

const ExamenTerminado = () => {
  const [searchParams] = useSearchParams()
  const examen_id = searchParams.get('examen_id')

  const { response, getNotaEjecucionExamen } = useGetNotaEjecucionExamen()

  useEffect(() => {
    getNotaEjecucionExamen({
      examen_id,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examen_id])

  return (
    <div className='h-dvh w-dvw flex flex-col gap-8 justify-center items-center -mt-16 relative'>
      <div className='absolute top-20 left-4'>
        <AvatarMenu />
      </div>
      <Confetti mode='fall' />
      <FaFlag size={100} className='text-emerald-600' />

      <div className='w-[30%] text-center text-4xl font-bold text-balance'>
        Felicitaciones
      </div>
      <div className='w-[30%] text-center text-xl font-semibold text-balance -mt-8'>
        Has terminado el examen
      </div>
      {response && response?.nota && (
        <div className='w-[30%] text-center text-3xl font-semibold text-balance'>
          <span className='text-sky-500'>Nota: </span>
          <span
            className={`${
              response?.nota > 11 ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            {`${response?.nota.toFixed(0).padStart(2, '0')}`}
          </span>
        </div>
      )}

      <ButtonPrimary
        className='animate-bounce animate-ease-in-out'
        onClick={() => (window.location.href = '/')}
      >
        Volver al inicio
      </ButtonPrimary>
    </div>
  )
}

ExamenTerminado.defaultProps = {}

ExamenTerminado.propTypes = {}

export default ExamenTerminado
