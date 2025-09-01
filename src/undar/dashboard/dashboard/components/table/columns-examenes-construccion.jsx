import { Tooltip } from 'antd'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaFlag } from 'react-icons/fa6'
import useFetchData from '../../../../hooks/useFetchData'
import { API_URL, states } from '../../../../lib/globales'
import PropTypes from 'prop-types'

const useColumnsExamenesConstruccion = ({ setReFetchExamenes }) => {
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
      headerName: 'N° Preguntas',
      field: 'preguntas',
      minWidth: 80,
      filter: 'agNumberColumnFilter',
      valueFormatter: params => params.value.length ?? 0,
      flex: 1,
    },
    {
      headerName: 'Acciones',
      cellRenderer: ({ data }) => (
        <div className='flex gap-2 items-center h-full'>
          <Tooltip title='Editar'>
            <FaEdit
              size={20}
              className='text-yellow-500 hover:scale-125 transition-all cursor-pointer'
            />
          </Tooltip>
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
                  onSuccess: () => setReFetchExamenes(prev => prev + 1),
                })
              }}
              size={20}
              className='text-emerald-500 hover:scale-125 transition-all cursor-pointer'
            />
          </Tooltip>
        </div>
      ),
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
