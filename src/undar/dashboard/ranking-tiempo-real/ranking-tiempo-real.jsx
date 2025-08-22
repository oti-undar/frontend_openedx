import React from 'react'
import { test } from '../testear-examen/test'
import RankingRow from './components/cards/ranking-row'
import ButtonPrimary from '../../components/buttons/button-primary'
import { FaCircleChevronRight } from 'react-icons/fa6'
import Counter from '../testear-examen/components/counter/counter'

const RankingTiempoReal = () => {
  return (
    <div className='flex flex-col gap-4 size-full py-8 px-12 overflow-y-auto rounded-2xl overflow-x-hidden relative'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-2 justify-center'>
          <h1 className='text-5xl font-bold animate-fade-right animate-ease-in-out'>
            {test.title}
          </h1>
          <h2 className='text-xl font-semibold text-gray-500 -mt-2 animate-fade-left animate-delay-500 animate-ease-in-out'>
            {test.curso.name}
          </h2>
        </div>
        <div className='flex items-center gap-4 -mt-4'>
          <div className='flex gap-2'>
            <div className='flex flex-col font-medium text-gray-700 mt-1'>
              <div>Pregunta</div>
              <div className='-mt-1'>Actual</div>
            </div>
            <div className='text-5xl font-bold'>: 1</div>
          </div>
          <Counter
            size={70}
            className='relative -mb-8 mr-8'
            classNameNumber='!text-base'
            pregunta={{
              id: 1,
              pregunta: '¿Cuál es la capital de España?',
              alternativas: [
                {
                  id: 1,
                  alternativa: 'Madrid',
                },
                {
                  id: 2,
                  alternativa: 'Barcelona',
                },
                {
                  id: 3,
                  alternativa: 'Valencia',
                },
                {
                  id: 4,
                  alternativa: 'Sevilla',
                },
              ],
              puntos: 1,
              duracion: 0.5,
              respuesta_id: null,
              inicio: 1752785198057,
            }}
            onComplete={() => {}}
          />
          <ButtonPrimary className=''>
            <FaCircleChevronRight />
            Siguiente Pregunta
          </ButtonPrimary>
        </div>
      </div>
      <div className='flex gap-6 mt-6 items-center flex-1 overflow-hidden w-full justify-around'>
        <div
          className='flex flex-col gap-6 w-fit px-5 justify-center items-center h-full overflow-y-auto rounded-2xl overflow-x-hidden'
          style={{ zoom: 1.5 }}
        >
          <RankingRow
            name='Arturo David'
            lastName='Rodas Gonzales'
            number={1}
          />
          <RankingRow
            name='Arturo David 2'
            lastName='Rodas Gonzales'
            number={2}
          />
          <RankingRow
            name='Arturo David 3'
            lastName='Rodas Gonzales'
            number={3}
          />
        </div>
        <div className='flex flex-col gap-6 w-fit px-5 items-center h-full overflow-y-auto rounded-2xl overflow-x-hidden'>
          <RankingRow
            name='Arturo David'
            lastName='Rodas Gonzales'
            number={4}
          />
          <RankingRow
            name='Arturo David'
            lastName='Rodas Gonzales'
            number={5}
          />
          <RankingRow
            name='Arturo David'
            lastName='Rodas Gonzales'
            number={6}
          />
          <RankingRow
            name='Arturo David'
            lastName='Rodas Gonzales'
            number={7}
          />
          <RankingRow
            name='Arturo David'
            lastName='Rodas Gonzales'
            number={8}
          />
          <RankingRow
            name='Arturo David'
            lastName='Rodas Gonzales'
            number={9}
          />
          <RankingRow
            name='Arturo David'
            lastName='Rodas Gonzales'
            number={10}
          />
          <RankingRow
            name='Arturo David'
            lastName='Rodas Gonzales'
            number={11}
          />
          <RankingRow
            name='Arturo David'
            lastName='Rodas Gonzales'
            number={12}
          />
          <RankingRow
            name='Arturo David'
            lastName='Rodas Gonzales'
            number={13}
          />
        </div>
      </div>
    </div>
  )
}

RankingTiempoReal.defaultProps = {}

RankingTiempoReal.propTypes = {}

export default RankingTiempoReal
