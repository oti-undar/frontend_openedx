import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import useColumnsAlumnosInscritos from './columns-alumnos-inscritos'
import TableAgGrid from '../../../../components/tables/table-agGrid'

const data = [
  {
    nombres: 'Juan Perez',
    nota: '10',
  },
  {
    nombres: 'Juan Perez',
    nota: '10',
  },
  {
    nombres: 'Juan Perez',
    nota: '10',
  },
  {
    nombres: 'Juan Perez',
    nota: '10',
  },
  {
    nombres: 'Juan Perez',
    nota: '10',
  },
  {
    nombres: 'Juan Perez',
    nota: '10',
  },
  {
    nombres: 'Juan Perez',
    nota: '10',
  },
  {
    nombres: 'Juan Perez',
    nota: '10',
  },
  {
    nombres: 'Juan Perez',
    nota: '10',
  },
  {
    nombres: 'Juan Perez',
    nota: '10',
  },
  {
    nombres: 'Juan Perez',
    nota: '10',
  },
  {
    nombres: 'Juan Perez',
    nota: '10',
  },
]

const TableAlumnosInscritos = forwardRef((props, ref) => (
  <TableAgGrid
    {...props}
    ref={ref}
    rowData={data}
    columnDefs={useColumnsAlumnosInscritos()}
  />
))

TableAlumnosInscritos.defaultProps = {
  className: '',
}

TableAlumnosInscritos.propTypes = {
  className: PropTypes.string,
}

export default TableAlumnosInscritos
