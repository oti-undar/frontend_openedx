import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import useColumnsDetallesAlumnoExamen from './columns-detalles-alumno-examen'
import TableAgGrid from '../../../../components/tables/table-agGrid'

const data = [
  {
    pregunta: 'Juan Perez',
    respuesta: '10',
    correcta: '10',
    puntos: '10',
  },
  {
    pregunta: 'Juan Perez',
    respuesta: '10',
    correcta: '10',
    puntos: '10',
  },
  {
    pregunta: 'Juan Perez',
    respuesta: '10',
    correcta: '10',
    puntos: '10',
  },
  {
    pregunta: 'Juan Perez',
    respuesta: '10',
    correcta: '10',
    puntos: '10',
  },
  {
    pregunta: 'Juan Perez',
    respuesta: '10',
    correcta: '10',
    puntos: '10',
  },
  {
    pregunta: 'Juan Perez',
    respuesta: '10',
    correcta: '10',
    puntos: '10',
  },
  {
    pregunta: 'Juan Perez',
    respuesta: '10',
    correcta: '10',
    puntos: '10',
  },
  {
    pregunta: 'Juan Perez',
    respuesta: '10',
    correcta: '10',
    puntos: '10',
  },
  {
    pregunta: 'Juan Perez',
    respuesta: '10',
    correcta: '10',
    puntos: '10',
  },
  {
    pregunta: 'Juan Perez',
    respuesta: '10',
    correcta: '10',
    puntos: '10',
  },
  {
    pregunta: 'Juan Perez',
    respuesta: '10',
    correcta: '10',
    puntos: '10',
  },
]

const TableDetallesAlumnoExamen = forwardRef((props, ref) => (
  <TableAgGrid
    {...props}
    ref={ref}
    rowData={data}
    columnDefs={useColumnsDetallesAlumnoExamen()}
  />
))

TableDetallesAlumnoExamen.defaultProps = {
  className: '',
}

TableDetallesAlumnoExamen.propTypes = {
  className: PropTypes.string,
}

export default TableDetallesAlumnoExamen
