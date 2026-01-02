import { Tooltip } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { GrRadialSelected } from 'react-icons/gr'
import { useLanguage } from '../../../../../context/useLanguaje'

const useColumnsCursos = ({ setCursoSeleccionado }) => {
  const { t } = useLanguage()

  return [
    {
      headerName: t.courses.table.name,
      field: 'name',
      minWidth: 200,
      filter: true,
      flex: 2,
    },
    {
      headerName: t.courses.table.actions,
      cellRenderer: ({ data }) => (
        <div className='flex gap-2 items-center h-full'>
          <Tooltip title={t.courses.table.select}>
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
}

useColumnsCursos.defaultProps = {}

useColumnsCursos.propTypes = {
  setCursoSeleccionado: PropTypes.func,
}

export default useColumnsCursos
