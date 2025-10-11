import { Modal, Tooltip } from 'antd'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaFlag, FaTrash } from 'react-icons/fa6'
import useFetchData from '../../../../hooks/useFetchData'
import { API_URL, states, tiposExamen } from '../../../../lib/globales'
import PropTypes from 'prop-types'
import { useRemoveExamen } from '../../hooks/use-remove-examen'
import { useNavigate } from 'react-router-dom'
import { GrTest } from 'react-icons/gr'
import { IoDocumentText } from 'react-icons/io5'

const useColumnsExamenesConstruccion = ({ setReFetchExamenes }) => {
  const { fetchData } = useFetchData()
  const navigate = useNavigate()
  const { removeExamen } = useRemoveExamen({
    onSuccess: () => setReFetchExamenes(prev => prev + 1),
  })

  return [
    {
      headerName: 'Título',
      field: 'title',
      minWidth: 200,
      filter: true,
      flex: 2,
    },
    {
      headerName: 'N° Preguntas',
      field: 'preguntas',
      minWidth: 80,
      filter: 'agNumberColumnFilter',
      valueFormatter: params => params.value.length ?? 0,
      flex: 1,
    },
    {
      headerName: 'Acciones',
      cellRenderer: ({ data }) => {
        return (
          <div className='flex gap-2 items-center h-full'>
            <Tooltip title='Dar comienzo al Examen'>
              <FaFlag
                onClick={() => {
                  fetchData({
                    method: 'POST',
                    url: `${API_URL()}/examen/${data.id}`,
                    data: {
                      state: {
                        connect: {
                          name: states.Disponible,
                        },
                      },
                      inicio_examen: new Date(),
                    },
                    msgSuccess: 'Examen iniciado correctamente',
                    onSuccess: () => {
                      setReFetchExamenes(prev => prev + 1)
                      if (data.tipo_examen === tiposExamen.Sync)
                        navigate(`/ranking-tiempo-real/${data.id}`)
                    },
                  })
                }}
                size={15}
                className='text-emerald-500 hover:scale-125 transition-all cursor-pointer'
              />
            </Tooltip>
            <Tooltip title='Editar'>
              <FaEdit
                onClick={() => navigate(`/editar-examen/${data.id}`)}
                size={15}
                className='text-yellow-500 hover:scale-125 transition-all cursor-pointer'
              />
            </Tooltip>
            <Tooltip title='Eliminar'>
              <FaTrash
                onClick={() =>
                  Modal.confirm({
                    title: 'Eliminar Examen',
                    content: '¿Estas seguro de eliminar este examen?',
                    onOk: () => removeExamen({ examen_id: data.id }),
                  })
                }
                size={15}
                className='text-red-500 hover:scale-125 transition-all cursor-pointer'
              />
            </Tooltip>
            <Tooltip title='Testear'>
              <GrTest
                onClick={() => navigate(`/testear-examen/${data.id}`)}
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

useColumnsExamenesConstruccion.defaultProps = {}

useColumnsExamenesConstruccion.propTypes = {
  setReFetchExamenes: PropTypes.func,
}

export default useColumnsExamenesConstruccion
