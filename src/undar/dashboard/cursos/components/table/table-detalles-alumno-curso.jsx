import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import useColumnsDetallesAlumnoCurso from './columns-detalles-alumno-curso'
import TableAgGrid from '../../../../components/tables/table-agGrid'
import { useGetDetallesCursoSeleccionado } from '../../hooks/use-get-detalles-curso-seleccionado'

const TableDetallesAlumnoCurso = forwardRef(
  ({ className, cursoSeleccionado }, ref) => {
    const { response, isloading } = useGetDetallesCursoSeleccionado({
      cursoSeleccionado,
    })

    const data = response?.usuarios ?? []

    return (
      <TableAgGrid
        className={className}
        ref={ref}
        rowData={data}
        columnDefs={useColumnsDetallesAlumnoCurso({ response })}
        loading={isloading}
      />
    )
  }
)

TableDetallesAlumnoCurso.defaultProps = {
  className: '',
}

TableDetallesAlumnoCurso.propTypes = {
  className: PropTypes.string,
  cursoSeleccionado: PropTypes.object,
}

export default TableDetallesAlumnoCurso
