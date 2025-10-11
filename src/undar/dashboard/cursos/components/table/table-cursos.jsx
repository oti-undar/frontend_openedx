import React, { forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import useColumnsCursos from './columns-cursos'
import TableAgGrid from '../../../../components/tables/table-agGrid'
import useFetchData from '../../../../hooks/useFetchData'
import { API_URL } from '../../../../lib/globales'
import qs from 'qs'
import { getUserAuth } from '../../../../utils/api-openEdx'

const TableCursos = forwardRef(({ className, setCursoSeleccionado }, ref) => {
  const user_id = getUserAuth().userId

  const { response: cursos, fetchData: fetchCursos } = useFetchData()
  useEffect(() => {
    fetchCursos({
      method: 'GET',
      url: `${API_URL()}/curso?${qs.stringify({
        user_id,
      })}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <TableAgGrid
      className={className}
      ref={ref}
      rowData={cursos}
      columnDefs={useColumnsCursos({ setCursoSeleccionado })}
    />
  )
})

TableCursos.defaultProps = {
  className: '',
}

TableCursos.propTypes = {
  className: PropTypes.string,
  setCursoSeleccionado: PropTypes.func,
}

export default TableCursos
