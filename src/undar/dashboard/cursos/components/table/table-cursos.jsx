import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import useColumnsCursos from './columns-cursos'
import TableAgGrid from '../../../../components/tables/table-agGrid'

const data = [
  {
    curso: 'Curso 1',
  },
  {
    curso: 'Curso 2',
  },
  {
    curso: 'Curso 3',
  },
  {
    curso: 'Curso 4',
  },
  {
    curso: 'Curso 5',
  },
  {
    curso: 'Curso 6',
  },
  {
    curso: 'Curso 7',
  },
  {
    curso: 'Curso 8',
  },
  {
    curso: 'Curso 9',
  },
  {
    curso: 'Curso 10',
  },
  {
    curso: 'Curso 11',
  },
  {
    curso: 'Curso 12',
  },
]

const TableCursos = forwardRef((props, ref) => (
  <TableAgGrid
    {...props}
    ref={ref}
    rowData={data}
    columnDefs={useColumnsCursos()}
  />
))

TableCursos.defaultProps = {
  className: '',
}

TableCursos.propTypes = {
  className: PropTypes.string,
}

export default TableCursos
