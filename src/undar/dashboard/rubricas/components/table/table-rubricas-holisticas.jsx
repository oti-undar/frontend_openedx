import React, { forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import TableAgGrid from '../../../../components/tables/table-agGrid'
import useFetchData from '../../../../hooks/useFetchData'
import { API_URL } from '../../../../lib/globales'
import qs from 'qs'
import { useSessionStorage } from '../../../../hooks/useSessionStorage'
import useColumnsRubricasHolisticas from './columns-rubricas-holisticas'

const TableRubricasHolisticas = forwardRef((props, ref) => {
  const [usuario] = useSessionStorage('usuario')
  const user_id = usuario.id

  const { response: data, isloading, fetchData } = useFetchData()
  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/rubrica/holistica?${qs.stringify({
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
      columnDefs={useColumnsRubricasHolisticas()}
      loading={isloading}
    />
  )
})

TableRubricasHolisticas.defaultProps = {
  className: '',
}

TableRubricasHolisticas.propTypes = {
  className: PropTypes.string,
}

export default TableRubricasHolisticas
