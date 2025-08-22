import React, { forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import useColumnsExamenes from './columns-examenes'
import TableAgGrid from '../../../../components/tables/table-agGrid'
import useFetchData from '../../../../hooks/useFetchData'
import { API_URL } from '../../../../lib/globales'
import qs from 'qs'
import { useSessionStorage } from '../../../../hooks/useSessionStorage'

const TableExamenes = forwardRef((props, ref) => {
  const [usuario] = useSessionStorage('usuario')
  const user_id = usuario.id

  const { response: data, isloading, fetchData } = useFetchData()
  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL}/examen?${qs.stringify({
        user_id,
      })}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TableAgGrid
      {...props}
      ref={ref}
      rowData={data}
      columnDefs={useColumnsExamenes()}
      loading={isloading}
    />
  )
})

TableExamenes.defaultProps = {
  className: '',
}

TableExamenes.propTypes = {
  className: PropTypes.string,
}

export default TableExamenes
