import PropTypes from 'prop-types'
import React from 'react'
import { API_URL } from '../../../../lib/globales'

const RankingRow = ({
  name,
  lastName,
  username,
  number,
  className,
  avatar,
}) => {
  return (
    <div className={`flex gap-4 items-center ${className}`}>
      {number && (
        <div className='text-5xl font-bold text-gray-700'>{number}.</div>
      )}
      <img
        className='max-w-[70px] max-h-[70px] rounded-full'
        src={`${API_URL()}${avatar}` || 'https://picsum.photos/1500/1500'}
        alt='Imagen de prueba'
      />
      <div className='flex flex-col'>
        <h1 className='text-2xl font-semibold'>{name || username}</h1>
        <h2 className='text-gray-500'>{lastName || '-'}</h2>
      </div>
    </div>
  )
}

RankingRow.defaultProps = {
  className: '',
}

RankingRow.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  number: PropTypes.number,
  className: PropTypes.string,
  avatar: PropTypes.string,
}

export default RankingRow
