import { Tooltip } from 'antd'
import React from 'react'
import { GrRadialSelected } from 'react-icons/gr'
import { PiExportBold } from 'react-icons/pi'

const useColumnsExamenes = () => [
  {
    headerName: 'Título',
    field: 'title',
    minWidth: 200,
    filter: true,
    flex: 2,
  },
  {
    headerName: 'Descripción',
    field: 'description',
    minWidth: 200,
    filter: true,
    valueFormatter: params => params.value ?? '-',
    flex: 2,
  },
  {
    headerName: 'N° Preguntas',
    field: 'preguntas',
    minWidth: 110,
    filter: 'agNumberColumnFilter',
    valueFormatter: params => params.value.length ?? 0,
    flex: 1,
  },
  {
    headerName: 'Curso',
    field: 'curso.name',
    minWidth: 110,
    flex: 1,
  },
  {
    headerName: 'Acciones',
    minWidth: 110,
    flex: 1,
    cellRenderer: () => (
      <div className='flex gap-2 items-center h-full'>
        <Tooltip title='Exportar'>
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
  },
]

useColumnsExamenes.defaultProps = {}

useColumnsExamenes.propTypes = {}

export default useColumnsExamenes
