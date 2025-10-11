import { message, Popover, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { FaShareAlt } from 'react-icons/fa'
import { GrRadialSelected } from 'react-icons/gr'
import { PiExportBold } from 'react-icons/pi'
import { API_URL, states, tiposExamen } from '../../../../lib/globales'
import { useNavigate } from 'react-router'
import { IoDocument } from 'react-icons/io5'

const useColumnsExamenes = ({ setExamenSeleccionado }) => {
  const navigate = useNavigate()

  return [
    {
      headerName: 'Título',
      field: 'title',
      minWidth: 200,
      filter: true,
      flex: 2,
    },
    {
      headerName: 'Descripción',
      field: 'description',
      minWidth: 200,
      filter: true,
      valueFormatter: params => params.value ?? '-',
      flex: 2,
    },
    {
      headerName: 'N° Preguntas',
      field: 'preguntas',
      minWidth: 50,
      filter: 'agNumberColumnFilter',
      valueFormatter: params => params.value.length ?? 0,
    },
    {
      headerName: 'Curso',
      field: 'curso.name',
      minWidth: 110,
      flex: 1,
    },
    {
      headerName: 'Rúbrica',
      field: 'id',
      minWidth: 110,
      filter: true,
      valueFormatter: ({ data }) =>
        `${data?.rubrica_analitica?.name || data?.rubrica_holistica?.name}`,
      flex: 1,
    },
    {
      headerName: 'Acciones',
      minWidth: 110,
      flex: 1,
      cellRenderer: ({ data }) => {
        return (
          <div className='flex gap-2 items-center h-full'>
            {/* <Tooltip title='Exportar'>
              <PiExportBold
                size={15}
                className='text-sky-500 hover:scale-125 transition-all cursor-pointer'
              />
            </Tooltip> */}
            <Tooltip title='Seleccionar'>
              <GrRadialSelected
                onClick={() => setExamenSeleccionado(data)}
                size={15}
                className='text-yellow-500 hover:scale-125 transition-all cursor-pointer'
              />
            </Tooltip>
            {data?.state?.name === states.Disponible && (
              <Popover
                trigger='click'
                title={
                  <div>
                    <p className='font-bold text-slate-500'>Compartir URL:</p>
                    <p
                      className='font-semibold text-sky-500 cursor-pointer'
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/realizar-examen/${data.id}`
                        )
                        message.success('URL copiada al portapapeles')
                      }}
                    >{`${window.location.origin}/realizar-examen/${data.id}`}</p>
                  </div>
                }
              >
                <FaShareAlt
                  size={15}
                  className='text-purple-500 hover:scale-125 transition-all cursor-pointer'
                />
              </Popover>
            )}
            {data?.tipo_examen === tiposExamen.Sync &&
              data?.state?.name === states.Disponible && (
                <Tooltip title='Ir al Examen'>
                  <IoDocument
                    onClick={() => {
                      navigate(`/ranking-tiempo-real/${data.id}`)
                    }}
                    size={15}
                    className='text-emerald-500 hover:scale-125 transition-all cursor-pointer'
                  />
                </Tooltip>
              )}
          </div>
        )
      },
    },
  ]
}

useColumnsExamenes.defaultProps = {}

useColumnsExamenes.propTypes = {
  setExamenSeleccionado: PropTypes.func,
}

export default useColumnsExamenes
