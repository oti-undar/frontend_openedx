import React, { forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import useColumnsExamenes from './columns-examenes'
import TableAgGrid from '../../../../components/tables/table-agGrid'
import useFetchData from '../../../../hooks/useFetchData'
import { API_URL } from '../../../../lib/globales'
import qs from 'qs'
import { getUserAuth } from '../../../../utils/api-openEdx'

const TableExamenes = forwardRef(
  ({ className, setExamenSeleccionado }, ref) => {
    const user_id = getUserAuth().userId

    const { response: data, isloading, fetchData } = useFetchData()
    useEffect(() => {
      fetchData({
        method: 'GET',
        url: `${API_URL()}/examen?${qs.stringify({
          user_id,
        })}`,
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <TableAgGrid
        className={className}
        ref={ref}
        rowData={data}
        columnDefs={useColumnsExamenes({ setExamenSeleccionado })}
        loading={isloading}
      />
    )
  }
)

TableExamenes.defaultProps = {
  className: '',
}

TableExamenes.propTypes = {
  className: PropTypes.string,
  setExamenSeleccionado: PropTypes.func,
}

export default TableExamenes
