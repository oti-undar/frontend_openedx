import React, { forwardRef } from 'react'
import useColumnsExamenesConstruccion from './columns-examenes-construccion'
import TableAgGrid from '../../../../components/tables/table-agGrid'
import PropTypes from 'prop-types'

const TableExamenesConstruccion = forwardRef(
  ({ isloading, data, setReFetchExamenes }, ref) => (
    <TableAgGrid
      ref={ref}
      rowData={data}
      columnDefs={useColumnsExamenesConstruccion({ setReFetchExamenes })}
      loading={isloading}
    />
  )
)

TableExamenesConstruccion.defaultProps = {
  isloading: false,
  data: [],
}

TableExamenesConstruccion.propTypes = {
  isloading: PropTypes.bool,
  data: PropTypes.array,
  setReFetchExamenes: PropTypes.func,
}

export default TableExamenesConstruccion
