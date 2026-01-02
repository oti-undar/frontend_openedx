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
import { useLanguage } from '../../../../../context/useLanguaje'

const useColumnsExamenesConstruccion = ({ setReFetchExamenes }) => {
  const { fetchData } = useFetchData()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { removeExamen } = useRemoveExamen({
    onSuccess: () => setReFetchExamenes((prev) => prev + 1),
  })

  return [
    {
      headerName: t.dashboard.columns.title,
      field: 'title',
      minWidth: 200,
      filter: true,
      flex: 2,
    },
    {
      headerName: t.dashboard.columns.questions,
      field: 'preguntas',
      minWidth: 80,
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => params.value.length ?? 0,
      flex: 1,
    },
    {
      headerName: t.dashboard.columns.actions,
      cellRenderer: ({ data }) => {
        return (
          <div className='flex gap-2 items-center h-full'>
            <Tooltip title={t.dashboard.tooltips.startExam}>
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
                    msgSuccess: t.dashboard.messages.examStarted,
                    onSuccess: () => {
                      setReFetchExamenes((prev) => prev + 1)
                      if (data.tipo_examen === tiposExamen.Sync)
                        navigate(`/ranking-tiempo-real/${data.id}`)
                    },
                  })
                }}
                size={15}
                className='text-emerald-500 hover:scale-125 transition-all cursor-pointer'
              />
            </Tooltip>
            <Tooltip title={t.dashboard.tooltips.edit}>
              <FaEdit
                onClick={() => navigate(`/editar-examen/${data.id}`)}
                size={15}
                className='text-yellow-500 hover:scale-125 transition-all cursor-pointer'
              />
            </Tooltip>
            <Tooltip title={t.dashboard.tooltips.delete}>
              <FaTrash
                onClick={() =>
                  Modal.confirm({
                    title: t.dashboard.messages.deleteTitle,
                    content: t.dashboard.messages.deleteConfirm,
                    onOk: () => removeExamen({ examen_id: data.id }),
                  })
                }
                size={15}
                className='text-red-500 hover:scale-125 transition-all cursor-pointer'
              />
            </Tooltip>
            <Tooltip title={t.dashboard.tooltips.test}>
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
