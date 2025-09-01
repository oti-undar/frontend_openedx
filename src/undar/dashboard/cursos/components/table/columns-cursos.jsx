import { Tooltip } from 'antd'
import React from 'react'
import { GrRadialSelected } from 'react-icons/gr'
import { PiExportBold } from 'react-icons/pi'

const useColumnsCursos = () => [
  {
    headerName: 'Curso',
    field: 'name',
    minWidth: 200,
    filter: true,
    flex: 2,
  },
  {
    headerName: 'Acciones',
    cellRenderer: () => (
      <div className='flex gap-2 items-center h-full'>
        <Tooltip title='Exportar banco de Exámenes'>
          <PiExportBold
            size={20}
            className='text-sky-500 hover:scale-125 transition-all cursor-pointer'
          />
        </Tooltip>

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

useColumnsCursos.defaultProps = {}

useColumnsCursos.propTypes = {}

export default useColumnsCursos
