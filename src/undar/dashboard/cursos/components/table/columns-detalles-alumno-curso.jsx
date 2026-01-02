import PropTypes from 'prop-types'
import React from 'react'
import { useLanguage } from '../../../../../context/useLanguaje'

function getNota({ examen_resuelto }) {
  const puntaje_total =
    examen_resuelto?.examen?.preguntas.reduce(
      (acc, item) => acc + (item?.puntos ?? 0),
      0
    ) ?? 0

  const puntaje_obtenido =
    examen_resuelto?.preguntas_resueltas?.reduce(
      (acc, item) =>
        acc +
        (item?.respuesta && item?.respuesta?.correcta
          ? item?.pregunta?.puntos ?? 0
          : 0),
      0
    ) ?? 0

  return Number(
    puntaje_total != 0
      ? ((puntaje_obtenido * 20) / puntaje_total).toFixed(0)
      : 0
  )
}

const useColumnsDetallesAlumnoCurso = ({ response }) => {
  const { t } = useLanguage()
  const maxExamenes = response?.examenes?.length ?? 0

  const examenesKeys = Array.from({ length: maxExamenes }, (_, i) => `${i + 1}`)
  const pesosTotales =
    response?.examenes?.reduce((acc, item) => acc + (item?.peso ?? 1), 0) ?? 1

  return [
    {
      headerName: t.studentsCourses.names,
      field: 'user',
      minWidth: 200,
      filter: true,
      valueFormatter: ({ value }) =>
        !value.first_name && !value.last_name
          ? value.username
          : `${value.first_name} ${value.last_name}`,
      flex: 2,
    },

    ...examenesKeys.map((key, index) => ({
      headerName: `${t.studentsCourses.exam} ${key}`,
      field: `user`,
      minWidth: 110,
      filter: 'agNumberColumnFilter',
      valueFormatter: ({ value }) => {
        const examen_resuelto = value?.examenes_resueltos[index]
        return getNota({ examen_resuelto })
      },
      flex: 1,
    })),

    {
      headerName: t.studentsCourses.average,
      field: 'user',
      minWidth: 110,
      filter: 'agNumberColumnFilter',
      valueFormatter: ({ value }) => {
        const examenes_resueltos = value?.examenes_resueltos || []
        if (examenes_resueltos.length === 0) return 0

        let sumNotas = 0

        examenes_resueltos.forEach((examen_resuelto) => {
          const nota = getNota({ examen_resuelto })
          sumNotas += nota * (examen_resuelto?.examen?.peso ?? 1)
        })

        return (sumNotas / pesosTotales).toFixed(0)
      },
      flex: 1,
    },
  ]
}

useColumnsDetallesAlumnoCurso.defaultProps = {}

useColumnsDetallesAlumnoCurso.propTypes = {
  response: PropTypes.array,
}

export default useColumnsDetallesAlumnoCurso
