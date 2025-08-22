import React from 'react'

const useColumnsDetallesAlumnoExamen = () => [
  {
    headerName: 'Pregunta',
    field: 'pregunta',
    minWidth: 200,
    filter: true,
    flex: 2,
  },
  {
    headerName: 'Respuesta Alumno',
    field: 'respuesta',
    minWidth: 200,
    filter: true,
    flex: 2,
  },
  {
    headerName: 'Respuesta Correcta',
    field: 'correcta',
    minWidth: 200,
    filter: true,
    flex: 2,
  },
  {
    headerName: 'Puntos',
    field: 'puntos',
    minWidth: 110,
    filter: 'agNumberColumnFilter',
    flex: 1,
  },
]

useColumnsDetallesAlumnoExamen.defaultProps = {}

useColumnsDetallesAlumnoExamen.propTypes = {}

export default useColumnsDetallesAlumnoExamen
