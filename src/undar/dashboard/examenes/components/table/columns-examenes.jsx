import { message, Popover, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { FaFlag, FaShareAlt } from 'react-icons/fa'
import { GrRadialSelected } from 'react-icons/gr'
import { API_URL, states, tiposExamen } from '../../../../lib/globales'
import { useNavigate } from 'react-router'
import { IoDocument } from 'react-icons/io5'
import useFetchData from '../../../../hooks/useFetchData'
import { FaCopy } from 'react-icons/fa6'
import { PiRankingFill } from 'react-icons/pi'

const useColumnsExamenes = ({ setExamenSeleccionado, setReFetch }) => {
  const navigate = useNavigate()

  const { fetchData } = useFetchData()

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
      valueFormatter: (params) => params.value ?? '-',
      flex: 2,
    },
    {
      headerName: 'N° Preguntas',
      field: 'preguntas',
      minWidth: 50,
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => params.value.length ?? 0,
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
      minWidth: 130,
      flex: 1,
      cellRenderer: ({ data }) => {
        return (
          <div className='flex gap-2 items-center h-full'>
            <Tooltip title='Seleccionar'>
              <GrRadialSelected
                onClick={() => setExamenSeleccionado(data)}
                size={15}
                className='text-yellow-500 hover:scale-125 transition-all cursor-pointer min-w-fit'
              />
            </Tooltip>
            <Tooltip title='Duplicar'>
              <FaCopy
                onClick={() => navigate(`/crear-examen?examen_id=${data.id}`)}
                size={15}
                className='text-slate-500 hover:scale-125 transition-all cursor-pointer min-w-fit'
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
                          `${window.location.origin}/examen/realizar-examen/${data.id}`
                        )
                        message.success('URL copiada al portapapeles')
                      }}
                    >{`${window.location.origin}/examen/realizar-examen/${data.id}`}</p>
                  </div>
                }
              >
                <FaShareAlt
                  size={15}
                  className='text-purple-500 hover:scale-125 transition-all cursor-pointer min-w-fit'
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
                    className='text-emerald-500 hover:scale-125 transition-all cursor-pointer min-w-fit'
                  />
                </Tooltip>
              )}
            {data.state.name === states.Disponible && (
              <Tooltip title='Finalizar Examen'>
                <FaFlag
                  onClick={() => {
                    fetchData({
                      method: 'POST',
                      url: `${API_URL()}/examen/${data.id}`,
                      data: {
                        state: {
                          connect: {
                            name: states.Finalizado,
                          },
                        },
                        final_examen: new Date(),
                      },
                      msgSuccess: 'Examen finalizado correctamente',
                      onSuccess: () => {
                        setReFetch((prev) => prev + 1)
                      },
                    })
                  }}
                  size={15}
                  className='text-rose-500 hover:scale-125 transition-all cursor-pointer min-w-fit'
                />
              </Tooltip>
            )}
            {data.state.name === states.Finalizado && (
              <Tooltip title='Ver Ranking'>
                <PiRankingFill
                  onClick={() => {
                    navigate(`/ranking-final-examen/${data.id}`)
                  }}
                  size={15}
                  className='text-yellow-500 hover:scale-125 transition-all cursor-pointer min-w-fit'
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
  setReFetch: PropTypes.func,
}

export default useColumnsExamenes
