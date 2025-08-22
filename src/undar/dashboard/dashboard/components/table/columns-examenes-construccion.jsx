import { Tooltip } from 'antd'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaFlag } from 'react-icons/fa6'

const useColumnsExamenesConstruccion = () => [
  {
    headerName: 'Título',
    field: 'title',
    minWidth: 200,
    filter: true,
    flex: 2,
  },
  {
    headerName: 'N° Preguntas',
    field: 'preguntas',
    minWidth: 80,
    filter: 'agNumberColumnFilter',
    valueFormatter: params => params.value.length ?? 0,
    flex: 1,
  },
  {
    headerName: 'Acciones',
    cellRenderer: () => (
      <div className='flex gap-2 items-center h-full'>
        <Tooltip title='Editar'>
          <FaEdit
            size={20}
            className='text-yellow-500 hover:scale-125 transition-all cursor-pointer'
          />
        </Tooltip>
        <Tooltip title='Dar comienzo al Examen'>
          <FaFlag
            size={20}
            className='text-emerald-500 hover:scale-125 transition-all cursor-pointer'
          />
        </Tooltip>
      </div>
    ),
    minWidth: 110,
    flex: 1,
  },
]

useColumnsExamenesConstruccion.defaultProps = {}

useColumnsExamenesConstruccion.propTypes = {}

export default useColumnsExamenesConstruccion
