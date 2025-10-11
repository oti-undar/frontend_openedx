import PropTypes from 'prop-types'
import React from 'react'

const useColumnsDetallesAlumnoExamen = ({ examenSeleccionado }) => [
  {
    headerName: 'Pregunta',
    field: 'pregunta',
    minWidth: 200,
    filter: true,
    valueFormatter: ({ value }) => value?.title,
    flex: 2,
  },
  {
    headerName: 'Respuesta Alumno',
    field: 'respuesta',
    minWidth: 200,
    filter: true,
    valueFormatter: ({ value }) => value?.respuesta || '-',
    flex: 2,
  },
  {
    headerName: 'Respuesta Correcta',
    field: 'pregunta',
    minWidth: 200,
    filter: true,
    valueFormatter: ({ value }) => {
      const respuestaCorrecta = value.respuestas.find(item => item.correcta)
      return respuestaCorrecta?.respuesta
    },
    flex: 2,
  },
  {
    headerName: 'Puntos',
    field: 'pregunta',
    minWidth: 110,
    filter: 'agNumberColumnFilter',
    valueFormatter: ({ value }) => {
      const total_puntos = examenSeleccionado.preguntas.reduce(
        (acc, item) => acc + item.puntos,
        0
      )

      const puntaje = (value.puntos * 20) / total_puntos
      const correcta = value.respuesta && value.respuesta?.correcta

      return correcta ? puntaje.toFixed(0) : 0
    },
    flex: 1,
  },
]

useColumnsDetallesAlumnoExamen.defaultProps = {}

useColumnsDetallesAlumnoExamen.propTypes = {
  examenSeleccionado: PropTypes.object,
}

export default useColumnsDetallesAlumnoExamen
