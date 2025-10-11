import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useColumnsAlumnosInscritos from './columns-alumnos-inscritos'
import TableAgGrid from '../../../../components/tables/table-agGrid'
import { useGetEjecucionesExamen } from '../../hooks/get-ejecuciones-examen'

const TableAlumnosInscritos = forwardRef(
  ({ className, examenSeleccionado, setAlumnoSeleccionado }, ref) => {
    const [data, setData] = useState([])

    const { isloading, getEjecucionesExamen } = useGetEjecucionesExamen()

    useEffect(() => {
      if (examenSeleccionado)
        getEjecucionesExamen({
          examen_id: examenSeleccionado.id,
          onSuccess: data => setData(data),
        })
      else setData([])
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examenSeleccionado])

    return (
      <TableAgGrid
        loading={isloading}
        className={className}
        ref={ref}
        rowData={data}
        columnDefs={useColumnsAlumnosInscritos({
          examenSeleccionado,
          setAlumnoSeleccionado,
        })}
      />
    )
  }
)

TableAlumnosInscritos.defaultProps = {
  className: '',
}

TableAlumnosInscritos.propTypes = {
  className: PropTypes.string,
  examenSeleccionado: PropTypes.object,
  setAlumnoSeleccionado: PropTypes.func,
}

export default TableAlumnosInscritos
