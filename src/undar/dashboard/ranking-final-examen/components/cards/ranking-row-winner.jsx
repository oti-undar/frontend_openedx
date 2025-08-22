import PropTypes from 'prop-types'
import React from 'react'
import RankingRow from '../../../ranking-tiempo-real/components/cards/ranking-row'

const RankingRowWinner = ({ name, lastName, className, first }) => {
  return (
    <div
      className={`flex flex-col gap-2 items-center justify-center ${className} ${
        first ? '-mt-[180px]' : ''
      }`}
      style={{ zoom: first ? 1.5 : 1.2 }}
    >
      <img
        className='max-w-[100px] max-h-[100px] rounded-full'
        src='https://picsum.photos/1500/1500'
        alt='Imagen de prueba'
      />
      <RankingRow name={name} lastName={lastName} />
    </div>
  )
}

RankingRowWinner.defaultProps = {
  className: '',
  first: false,
}

RankingRowWinner.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  className: PropTypes.string,
  first: PropTypes.bool,
}

export default RankingRowWinner
