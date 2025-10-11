import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import useColumnsDetallesAlumnoExamen from './columns-detalles-alumno-examen'
import TableAgGrid from '../../../../components/tables/table-agGrid'

const TableDetallesAlumnoExamen = forwardRef(
  ({ className, examenSeleccionado, alumnoSeleccionado }, ref) => {
    const data = alumnoSeleccionado?.preguntas_resueltas || []

    return (
      <TableAgGrid
        className={className}
        ref={ref}
        rowData={data}
        columnDefs={useColumnsDetallesAlumnoExamen({ examenSeleccionado })}
      />
    )
  }
)

TableDetallesAlumnoExamen.defaultProps = {
  className: '',
}

TableDetallesAlumnoExamen.propTypes = {
  className: PropTypes.string,
  examenSeleccionado: PropTypes.object,
  alumnoSeleccionado: PropTypes.object,
}

export default TableDetallesAlumnoExamen
