import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useColumnsAlumnosInscritos from './columns-alumnos-inscritos'
import TableAgGrid from '../../../../components/tables/table-agGrid'
import { useGetEjecucionesExamen } from '../../hooks/get-ejecuciones-examen'
import ModalShowDoc from '../../../../components/modals/modal-show-doc'
import DocExamenAlumno from '../docs/doc-examen-alumno'

const TableAlumnosInscritos = forwardRef(
  (
    {
      className,
      examenSeleccionado,
      setAlumnoSeleccionado,
      alumnoSeleccionado,
    },
    ref
  ) => {
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

    const [open, setOpen] = useState(false)

    const title = `${examenSeleccionado?.title || ''} - ${
      alumnoSeleccionado?.user?.first_name
        ? `${alumnoSeleccionado?.user?.first_name} ${alumnoSeleccionado?.user?.last_name}`
        : alumnoSeleccionado?.user?.username
    }`

    return (
      <>
        <ModalShowDoc open={open} setOpen={setOpen} title={title}>
          <DocExamenAlumno
            examenSeleccionado={examenSeleccionado}
            alumnoSeleccionado={alumnoSeleccionado}
            title={title}
          />
        </ModalShowDoc>
        <TableAgGrid
          loading={isloading}
          className={className}
          ref={ref}
          rowData={data}
          columnDefs={useColumnsAlumnosInscritos({
            examenSeleccionado,
            setAlumnoSeleccionado,
            setOpen,
          })}
        />
      </>
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
  alumnoSeleccionado: PropTypes.object,
}

export default TableAlumnosInscritos
