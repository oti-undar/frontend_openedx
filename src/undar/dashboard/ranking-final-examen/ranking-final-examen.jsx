import React from 'react'
import { test } from '../testear-examen/test'
import RankingRowWinner from './components/cards/ranking-row-winner'
import Confetti from 'react-confetti-boom'

const RankingFinalExamen = () => {
  return (
    <div className='flex flex-col gap-4 size-full py-8 px-12 text-center'>
      <Confetti mode='fall' />
      <h1 className='text-5xl font-bold animate-fade-right animate-ease-in-out'>
        {test.title}
      </h1>
      <h2 className='text-xl font-semibold text-gray-500 -mt-2 animate-fade-left animate-delay-500 animate-ease-in-out'>
        {test.curso.name}
      </h2>
      <div className='flex gap-16 mt-8 justify-center items-center size-full'>
        <RankingRowWinner name='Arturo David 2' lastName='Rodas Gonzales' />
        <RankingRowWinner name='Arturo David' lastName='Rodas Gonzales' first />
        <RankingRowWinner name='Arturo David 3' lastName='Rodas Gonzales' />
      </div>
    </div>
  )
}

RankingFinalExamen.defaultProps = {}

RankingFinalExamen.propTypes = {}

export default RankingFinalExamen
