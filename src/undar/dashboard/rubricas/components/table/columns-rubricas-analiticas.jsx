import { Modal, Tooltip } from 'antd'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import { useNavigate } from 'react-router'
import { useLanguage } from '../../../../../context/useLanguaje'

const useColumnsRubricasAnaliticas = ({ removeRubrica }) => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return [
    {
      headerName: t.rubrics.table.identifier,
      field: 'name',
      minWidth: 200,
      filter: true,
      flex: 2,
    },
    {
      headerName: t.rubrics.table.actions,
      field: '_count',
      cellRenderer: ({ value, data }) => {
        const examenes = value?.examenes || 0
        return (
          <div className='flex gap-2 items-center h-full'>
            <Tooltip
              title={
                examenes == 0
                  ? t.rubrics.table.tooltips.edit
                  : t.rubrics.table.tooltips.cantEdit
              }
            >
              <FaEdit
                onClick={() => navigate(`/editar-rubrica-analitica/${data.id}`)}
                size={15}
                className={`${
                  examenes == 0
                    ? 'text-yellow-500 cursor-pointer'
                    : 'text-slate-500 opacity-50 cursor-not-allowed'
                } hover:scale-125 transition-all`}
              />
            </Tooltip>
            <Tooltip
              title={
                examenes == 0
                  ? t.rubrics.table.tooltips.delete
                  : t.rubrics.table.tooltips.cantDelete
              }
            >
              <FaTrash
                onClick={() => {
                  if (examenes == 0)
                    Modal.confirm({
                      title: t.rubrics.table.modals.deleteTitle,
                      content: t.rubrics.table.modals.deleteContent,
                      onOk: () => removeRubrica({ examen_id: data.id }),
                    })
                }}
                size={15}
                className={`${
                  examenes == 0
                    ? 'text-red-500 cursor-pointer'
                    : 'text-slate-500 opacity-50 cursor-not-allowed'
                } hover:scale-125 transition-all`}
              />
            </Tooltip>
          </div>
        )
      },
      minWidth: 80,
      flex: 1,
    },
  ]
}

useColumnsRubricasAnaliticas.defaultProps = {}

useColumnsRubricasAnaliticas.propTypes = {}

export default useColumnsRubricasAnaliticas
