import { Tooltip } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { GrRadialSelected } from 'react-icons/gr'
import { PiExportBold } from 'react-icons/pi'

const useColumnsCursos = ({ setCursoSeleccionado }) => [
  {
    headerName: 'Curso',
    field: 'name',
    minWidth: 200,
    filter: true,
    flex: 2,
  },
  {
    headerName: 'Acciones',
    cellRenderer: ({ data }) => (
      <div className='flex gap-2 items-center h-full'>
        {/* <Tooltip title='Exportar banco de Exámenes'>
          <PiExportBold
            size={15}
            className='text-sky-500 hover:scale-125 transition-all cursor-pointer'
          />
        </Tooltip> */}

        <Tooltip title='Seleccionar'>
          <GrRadialSelected
            onClick={() => setCursoSeleccionado(data)}
            size={15}
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

useColumnsCursos.propTypes = {
  setCursoSeleccionado: PropTypes.func,
}

export default useColumnsCursos
