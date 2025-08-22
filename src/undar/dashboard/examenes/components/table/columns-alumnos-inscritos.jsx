import { Tooltip } from 'antd'
import React from 'react'
import { GrRadialSelected } from 'react-icons/gr'

const useColumnsAlumnosInscritos = () => [
  {
    headerName: 'Nombres y Apellidos',
    field: 'nombres',
    minWidth: 200,
    filter: true,
    flex: 2,
  },
  {
    headerName: 'Nota',
    field: 'nota',
    minWidth: 110,
    filter: 'agNumberColumnFilter',
    flex: 1,
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

useColumnsAlumnosInscritos.defaultProps = {}

useColumnsAlumnosInscritos.propTypes = {}

export default useColumnsAlumnosInscritos
