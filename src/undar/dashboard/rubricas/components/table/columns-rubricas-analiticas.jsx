import { Tooltip } from 'antd'
import React from 'react'
import { GrRadialSelected } from 'react-icons/gr'

const useColumnsRubricasAnaliticas = () => [
  {
    headerName: 'Identificador',
    field: 'name',
    minWidth: 200,
    filter: true,
    flex: 2,
  },
  {
    headerName: 'Acciones',
    cellRenderer: () => (
      <div className='flex gap-2 items-center h-full'>
        <Tooltip title='Seleccionar'>
          <GrRadialSelected
            size={20}
            className='text-yellow-500 hover:scale-125 transition-all cursor-pointer'
          />
        </Tooltip>
      </div>
    ),
    minWidth: 110,
    flex: 1,
  },
]

useColumnsRubricasAnaliticas.defaultProps = {}

useColumnsRubricasAnaliticas.propTypes = {}

export default useColumnsRubricasAnaliticas
