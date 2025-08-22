import { Tooltip } from 'antd'
import React from 'react'
import { PiExportBold } from 'react-icons/pi'

const useColumnsDetallesAlumnoCurso = () => [
  {
    headerName: 'Nombres y Apellidos',
    field: 'nombres',
    minWidth: 200,
    filter: true,
    flex: 2,
  },
  {
    headerName: 'Examen 1',
    field: 'examen1',
    minWidth: 110,
    filter: 'agNumberColumnFilter',
    flex: 1,
  },
  {
    headerName: 'Examen 2',
    field: 'examen2',
    minWidth: 110,
    filter: 'agNumberColumnFilter',
    flex: 1,
  },
  {
    headerName: 'Examen 3',
    field: 'examen3',
    minWidth: 110,
    filter: 'agNumberColumnFilter',
    flex: 1,
  },
  {
    headerName: 'Promedio',
    field: 'promedio',
    minWidth: 110,
    filter: 'agNumberColumnFilter',
    flex: 1,
  },
  {
    headerName: 'Acciones',
    cellRenderer: () => (
      <div className='flex gap-2 items-center h-full'>
        <Tooltip title='Exportar Exámenes'>
          <PiExportBold
            size={20}
            className='text-sky-500 hover:scale-125 transition-all cursor-pointer'
          />
        </Tooltip>
      </div>
    ),
    minWidth: 110,
    flex: 1,
  },
]

useColumnsDetallesAlumnoCurso.defaultProps = {}

useColumnsDetallesAlumnoCurso.propTypes = {}

export default useColumnsDetallesAlumnoCurso
