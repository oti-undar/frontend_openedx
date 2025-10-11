import { Modal, Tooltip } from 'antd'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import { useNavigate } from 'react-router'

const useColumnsRubricasHolisticas = ({ removeRubrica }) => {
  const navigate = useNavigate()
  return [
    {
      headerName: 'Identificador',
      field: 'name',
      minWidth: 200,
      filter: true,
      flex: 2,
    },
    {
      headerName: 'Acciones',
      field: '_count',
      cellRenderer: ({ value, data }) => {
        const examenes = value?.examenes || 0
        return (
          <div className='flex gap-2 items-center h-full'>
            <Tooltip
              title={
                examenes == 0
                  ? 'Editar'
                  : 'No se puede editar por que tiene examenes asociados'
              }
            >
              <FaEdit
                onClick={() => navigate(`/editar-rubrica-holistica/${data.id}`)}
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
                  ? 'Eliminar'
                  : 'No se puede eliminar por que tiene examenes asociados'
              }
            >
              <FaTrash
                onClick={() => {
                  if (examenes == 0)
                    Modal.confirm({
                      title: 'Eliminar Rubrica',
                      content: '¿Estas seguro de eliminar esta rúbrica?',
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

useColumnsRubricasHolisticas.defaultProps = {}

useColumnsRubricasHolisticas.propTypes = {}

export default useColumnsRubricasHolisticas
