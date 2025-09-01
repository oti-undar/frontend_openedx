import React from 'react'
import { ImBlocked } from 'react-icons/im'
import PropTypes from 'prop-types'
import ButtonPrimary from '../../buttons/button-primary'

const Bloqueado = ({ description, textButton, onClick }) => {
  return (
    <div className='h-dvh w-dvw flex flex-col gap-8 justify-center items-center -mt-16'>
      <ImBlocked size={100} className='text-rose-700' />

      <div className='w-[30%] text-center text-4xl font-bold text-balance'>
        {description}
      </div>

      <ButtonPrimary
        className='animate-bounce animate-ease-in-out'
        onClick={onClick}
      >
        {textButton}
      </ButtonPrimary>
    </div>
  )
}

Bloqueado.defaultProps = {}

Bloqueado.propTypes = {
  description: PropTypes.string,
  textButton: PropTypes.string,
  onClick: PropTypes.func,
}

export default Bloqueado
