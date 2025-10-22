import { Tooltip } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { GrRadialSelected } from 'react-icons/gr'
import { SiTestcafe } from 'react-icons/si'
import { tiposExamen } from '../../../../lib/globales'
import { useNavigate } from 'react-router'

export function getTotalObtenido({ preguntas_resueltas }) {
  return (
    preguntas_resueltas.reduce(
      (acc, item) =>
        acc +
        (item.respuesta && item.respuesta?.correcta
          ? item?.pregunta?.puntos
          : 0),
      0
    ) ?? 0
  )
}

export function getNivelPorNotaEnRango({ nota, niveles }) {
  const rango = niveles.find(r => {
    const [min, max] = r.nota.split('-').map(Number)
    return nota >= min && nota <= max
  })
  return rango ? rango.name : null
}

const useColumnsAlumnosInscritos = ({
  examenSeleccionado,
  setAlumnoSeleccionado,
}) => {
  const navigate = useNavigate()
  const isAnalitica = !!examenSeleccionado?.rubrica_analitica
  const total_puntos =
    examenSeleccionado?.preguntas?.reduce(
      (acc, item) => acc + item.puntos,
      0
    ) ?? 1

  let columnas_extra = []

  if (isAnalitica) {
    columnas_extra = examenSeleccionado?.rubrica_analitica.indicadores.map(
      indicador => ({
        headerName: indicador.name,
        field: `preguntas_resueltas`,
        minWidth: 110,
        filter: 'agNumberColumnFilter',
        valueFormatter: ({ value }) => {
          const preguntas_del_indicador = value.filter(item =>
            item.pregunta.indicadores
              .map(indic => indic.id)
              .includes(indicador.id)
          )
          const total_puntos_local =
            examenSeleccionado?.preguntas
              .filter(item =>
                preguntas_del_indicador
                  .map(pregunta_resuelta => pregunta_resuelta.pregunta.id)
                  .includes(item.id)
              )
              ?.reduce((acc, item) => acc + item.puntos, 0) ?? 1
          const total_obtenido = getTotalObtenido({
            preguntas_resueltas: preguntas_del_indicador,
          })

          const nota = ((total_obtenido * 20) / total_puntos_local).toFixed(0)

          return getNivelPorNotaEnRango({
            nota,
            niveles: indicador.niveles_de_logro,
          })
        },
        flex: 1,
      })
    )
  } else {
    columnas_extra = [
      {
        headerName: 'Nivel de Competencia',
        field: 'preguntas_resueltas',
        minWidth: 110,
        filter: true,
        valueFormatter: ({ value }) => {
          const total_obtenido = getTotalObtenido({
            preguntas_resueltas: value,
          })
          const nota = ((total_obtenido * 20) / total_puntos).toFixed(0)

          return getNivelPorNotaEnRango({
            nota,
            niveles: examenSeleccionado.rubrica_holistica.niveles_de_logro,
          })
        },
        flex: 1,
      },
    ]
  }
  return [
    {
      headerName: 'Nombres y Apellidos',
      field: 'user',
      minWidth: 200,
      filter: true,
      valueFormatter: ({ value }) =>
        !value.first_name && !value.last_name
          ? value.username
          : `${value.first_name} ${value.last_name}`,
      flex: 2,
    },
    {
      headerName: 'Nota',
      field: 'preguntas_resueltas',
      minWidth: 110,
      filter: 'agNumberColumnFilter',
      valueFormatter: ({ value }) => {
        const total_obtenido = getTotalObtenido({ preguntas_resueltas: value })
        return ((total_obtenido * 20) / total_puntos).toFixed(0)
      },
      flex: 1,
    },
    ...columnas_extra,
    {
      headerName: 'Acciones',
      cellRenderer: ({ data }) => (
        <div className='flex gap-2 items-center h-full'>
          <Tooltip title='Seleccionar'>
            <GrRadialSelected
              onClick={() => setAlumnoSeleccionado(data)}
              size={15}
              className='text-yellow-500 hover:scale-125 transition-all cursor-pointer'
            />
          </Tooltip>
          {examenSeleccionado.tipo_examen === tiposExamen.Solo &&
            !data.fin_examen && (
              <Tooltip title='Calificar (Solo Docente)'>
                <SiTestcafe
                  onClick={() => {
                    navigate(
                      `/realizar-examen/${examenSeleccionado.id}?user_id=${data.user.id}`
                    )
                  }}
                  size={15}
                  className='text-emerald-500 hover:scale-125 transition-all cursor-pointer'
                />
              </Tooltip>
            )}
        </div>
      ),
      minWidth: 110,
      flex: 1,
    },
  ]
}

useColumnsAlumnosInscritos.defaultProps = {}

useColumnsAlumnosInscritos.propTypes = {
  examenSeleccionado: PropTypes.object,
  setAlumnoSeleccionado: PropTypes.func,
}

export default useColumnsAlumnosInscritos
