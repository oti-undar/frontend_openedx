import React from 'react'
import {
  getNivelPorNotaEnRango,
  getTotalObtenido,
} from '../../../examenes/components/table/columns-alumnos-inscritos'
import { Tooltip } from 'antd'
import { IoMdCloudDownload } from 'react-icons/io'
import { exportHolistica } from '../../../../utils/ag-grid'
import { useLanguage } from '../../../../../context/useLanguaje'

const useColumnsListaExamen = () => {
  const { t } = useLanguage()

  return [
    {
      headerName: t.dashboard.columns.course,
      field: 'curso.name',
      minWidth: 200,
      filter: true,
      flex: 2,
    },
    {
      headerName: t.dashboard.columns.title,
      field: 'title',
      minWidth: 200,
      filter: true,
      flex: 2,
    },
    {
      headerName: t.dashboard.columns.enrolled,
      field: 'ejecuciones',
      minWidth: 110,
      filter: 'agNumberColumnFilter',
      valueFormatter: ({ value }) => value.length || 0,
      flex: 1,
    },
    {
      headerName: t.dashboard.columns.approved,
      field: 'preguntas',
      minWidth: 110,
      filter: 'agNumberColumnFilter',
      valueFormatter: ({ value, data }) => {
        const ejecuciones = data.ejecuciones
        const total_puntos =
          value?.reduce((acc, item) => acc + item.puntos, 0) ?? 1
        let aprobados = 0

        ejecuciones.forEach((ex) => {
          const total_obtenido = getTotalObtenido({
            preguntas_resueltas: ex.preguntas_resueltas,
          })
          const nota = ((total_obtenido * 20) / total_puntos).toFixed(0)
          if (nota >= 11) aprobados++
        })
        return aprobados
      },
      flex: 1,
    },
    {
      headerName: t.dashboard.columns.actions,
      cellRenderer: ({ data }) => {
        const ejecuciones = data?.ejecuciones || []
        const isHolistica = !!data.rubrica_holistica
        const total_puntos =
          data?.preguntas?.reduce((acc, item) => acc + item.puntos, 0) ?? 1
        const totales_alumnos = data?.curso?._count?.usuarios || 0

        let obj = []
        let titles = []
        const mapa = new Map()
        if (isHolistica) {
          const niveles_de_logro =
            data?.rubrica_holistica?.niveles_de_logro || []
          titles.push(data?.rubrica_holistica?.name)
          ejecuciones.forEach((ex) => {
            const total_obtenido = getTotalObtenido({
              preguntas_resueltas: ex.preguntas_resueltas,
            })
            const nota = ((total_obtenido * 20) / total_puntos).toFixed(0)
            const nivelName = getNivelPorNotaEnRango({
              nota,
              niveles: niveles_de_logro,
            })
            if (!mapa.has(nivelName)) {
              mapa.set(nivelName, {
                Niveles: nivelName,
                Cantidad: 0,
                Porcentaje: 0,
              })
            }
            mapa.get(nivelName).Cantidad++
          })
          Array.from(mapa.values()).forEach((nivel) => {
            nivel.Porcentaje =
              ((nivel.Cantidad * 100) / totales_alumnos).toFixed(0) + '%'
          })
        } else {
          const indicadores = data?.rubrica_analitica?.indicadores || []
          indicadores.forEach((indicador) => {
            titles.push(indicador.name)
            ejecuciones.forEach((ex) => {
              const preguntas_del_indicador = ex.preguntas_resueltas.filter(
                (item) =>
                  item.pregunta.indicadores
                    .map((indic) => indic.id)
                    .includes(indicador.id)
              )
              const total_puntos_local =
                data?.preguntas
                  .filter((item) =>
                    preguntas_del_indicador
                      .map((pregunta_resuelta) => pregunta_resuelta.pregunta.id)
                      .includes(item.id)
                  )
                  ?.reduce((acc, item) => acc + item.puntos, 0) ?? 1
              const total_obtenido = getTotalObtenido({
                preguntas_resueltas: preguntas_del_indicador,
              })

              const nota = ((total_obtenido * 20) / total_puntos_local).toFixed(
                0
              )
              const nivelName = getNivelPorNotaEnRango({
                nota,
                niveles: indicador.niveles_de_logro,
              })
              if (!mapa.has(nivelName)) {
                const result = indicadores.reduce((acc, indicador) => {
                  acc[`Niveles(${indicador.name})`] = nivelName
                  acc[`Cantidad(${indicador.name})`] = 0
                  acc[`Porcentaje(${indicador.name})`] = 0
                  return acc
                }, {})
                mapa.set(nivelName, result)
              }
              mapa.get(nivelName)[`Cantidad(${indicador.name})`]++
            })
          })
          indicadores.forEach((indicador) => {
            Array.from(mapa.values()).forEach((nivel) => {
              nivel[`Porcentaje(${indicador.name})`] =
                (
                  (nivel[`Cantidad(${indicador.name})`] * 100) /
                  totales_alumnos
                ).toFixed(0) + '%'
            })
          })
        }
        obj = Array.from(mapa.values())

        return (
          <div className='flex gap-2 items-center h-full'>
            <Tooltip title={t.dashboard.tooltips.downloadRubric}>
              <IoMdCloudDownload
                onClick={() =>
                  exportHolistica(obj, `Resultados de ${data?.title}`, titles)
                }
                size={15}
                className='text-blue-500 hover:scale-125 transition-all cursor-pointer'
              />
            </Tooltip>
          </div>
        )
      },
      minWidth: 110,
      flex: 1,
    },
  ]
}

useColumnsListaExamen.defaultProps = {}

useColumnsListaExamen.propTypes = {}

export default useColumnsListaExamen
