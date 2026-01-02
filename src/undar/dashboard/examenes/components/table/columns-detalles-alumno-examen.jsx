import PropTypes from 'prop-types'
import React from 'react'
import { tiposExamen } from '../../../../lib/globales'
import { useLanguage } from '../../../../../context/useLanguaje'

const useColumnsDetallesAlumnoExamen = ({ examenSeleccionado }) => {
  const { t } = useLanguage()

  return [
    {
      headerName: t.exams.detailsTable.question,
      field: 'pregunta',
      minWidth: 200,
      filter: true,
      valueFormatter: ({ value }) => value?.title,
      flex: 2,
    },
    {
      headerName: t.exams.detailsTable.studentAnswer,
      field: 'respuesta',
      minWidth: 200,
      filter: true,
      valueFormatter: ({ value }) => value?.respuesta || '-',
      flex: 2,
    },
    {
      headerName: t.exams.detailsTable.correctAnswer,
      field: 'pregunta',
      minWidth: 200,
      filter: true,
      valueFormatter: ({ value }) => {
        const respuestaCorrecta = value.respuestas.find((item) => item.correcta)
        return respuestaCorrecta?.respuesta
      },
      flex: 2,
    },
    ...(examenSeleccionado?.tipo_examen === tiposExamen.Alumno ||
    examenSeleccionado?.tipo_examen === tiposExamen.Solo
      ? [
          {
            headerName:
              examenSeleccionado?.tipo_examen === tiposExamen.Alumno
                ? t.testExam.whatToImprove
                : t.testExam.observation,
            field: 'retroalimentacion',
            minWidth: 200,
            filter: true,
            valueFormatter: ({ value }) => value || '-',
            flex: 2,
          },
        ]
      : []),
    {
      headerName: t.exams.detailsTable.points,
      field: 'pregunta',
      minWidth: 110,
      filter: 'agNumberColumnFilter',
      valueFormatter: ({ value, data }) => {
        const total_puntos = examenSeleccionado.preguntas.reduce(
          (acc, item) => acc + item.puntos,
          0
        )

        const puntaje = (value.puntos * 20) / total_puntos
        const correcta = data.respuesta && data.respuesta?.correcta

        return correcta ? puntaje.toFixed(0) : 0
      },
      flex: 1,
    },
  ]
}

useColumnsDetallesAlumnoExamen.defaultProps = {}

useColumnsDetallesAlumnoExamen.propTypes = {
  examenSeleccionado: PropTypes.object,
}

export default useColumnsDetallesAlumnoExamen
