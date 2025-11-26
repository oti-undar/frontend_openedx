import PropTypes from 'prop-types'
import React from 'react'
import RankingRow from '../../../ranking-tiempo-real/components/cards/ranking-row'

const RankingRowWinner = ({
  name,
  lastName,
  username,
  className,
  first,
  avatar,
}) => {
  return (
    <div
      className={`flex flex-col gap-2 items-center justify-center ${className} ${
        first ? '-mt-[180px]' : ''
      }`}
      style={{ zoom: first ? 1.5 : 1.2 }}
    >
      <RankingRow
        name={name}
        lastName={lastName}
        username={username}
        avatar={avatar}
      />
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
  username: PropTypes.string.isRequired,
  className: PropTypes.string,
  first: PropTypes.bool,
  avatar: PropTypes.string,
}

export default RankingRowWinner
