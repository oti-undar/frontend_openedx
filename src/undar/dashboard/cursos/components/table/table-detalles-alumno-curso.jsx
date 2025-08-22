import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import useColumnsDetallesAlumnoCurso from './columns-detalles-alumno-curso'
import TableAgGrid from '../../../../components/tables/table-agGrid'

const data = [
  {
    nombres: 'Juan Perez',
    examen1: '5',
    peso1: '1',
    examen2: '9',
    peso2: '2',
    examen3: '10',
    peso3: '3',
  },
  {
    nombres: 'Juan Perez',
    examen1: '5',
    peso1: '1',
    examen2: '9',
    peso2: '2',
    examen3: '10',
    peso3: '3',
  },
  {
    nombres: 'Juan Perez',
    examen1: '5',
    peso1: '1',
    examen2: '9',
    peso2: '2',
    examen3: '10',
    peso3: '3',
  },
  {
    nombres: 'Juan Perez',
    examen1: '5',
    peso1: '1',
    examen2: '9',
    peso2: '2',
    examen3: '10',
    peso3: '3',
  },
  {
    nombres: 'Juan Perez',
    examen1: '5',
    peso1: '1',
    examen2: '9',
    peso2: '2',
    examen3: '10',
    peso3: '3',
  },
  {
    nombres: 'Juan Perez',
    examen1: '5',
    peso1: '1',
    examen2: '9',
    peso2: '2',
    examen3: '10',
    peso3: '3',
  },
  {
    nombres: 'Juan Perez',
    examen1: '5',
    peso1: '1',
    examen2: '9',
    peso2: '2',
    examen3: '10',
    peso3: '3',
  },
  {
    nombres: 'Juan Perez',
    examen1: '5',
    peso1: '1',
    examen2: '9',
    peso2: '2',
    examen3: '10',
    peso3: '3',
  },
  {
    nombres: 'Juan Perez',
    examen1: '5',
    peso1: '1',
    examen2: '9',
    peso2: '2',
    examen3: '10',
    peso3: '3',
  },
  {
    nombres: 'Juan Perez',
    examen1: '5',
    peso1: '1',
    examen2: '9',
    peso2: '2',
    examen3: '10',
    peso3: '3',
  },
  {
    nombres: 'Juan Perez',
    examen1: '5',
    peso1: '1',
    examen2: '9',
    peso2: '2',
    examen3: '10',
    peso3: '3',
  },
  {
    nombres: 'Juan Perez',
    examen1: '5',
    peso1: '1',
    examen2: '9',
    peso2: '2',
    examen3: '10',
    peso3: '3',
  },
]

const TableDetallesAlumnoCurso = forwardRef((props, ref) => (
  <TableAgGrid
    {...props}
    ref={ref}
    rowData={data}
    columnDefs={useColumnsDetallesAlumnoCurso()}
  />
))

TableDetallesAlumnoCurso.defaultProps = {
  className: '',
}

TableDetallesAlumnoCurso.propTypes = {
  className: PropTypes.string,
}

export default TableDetallesAlumnoCurso
