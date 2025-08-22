import React, { forwardRef } from 'react'
import useColumnsExamenesConstruccion from './columns-examenes-construccion'
import TableAgGrid from '../../../../components/tables/table-agGrid'
import PropTypes from 'prop-types'

const TableExamenesConstruccion = forwardRef(({ isloading, data }, ref) => (
  <TableAgGrid
    ref={ref}
    rowData={data}
    columnDefs={useColumnsExamenesConstruccion()}
    loading={isloading}
  />
))

TableExamenesConstruccion.defaultProps = {
  isloading: false,
  data: [],
}

TableExamenesConstruccion.propTypes = {
  isloading: PropTypes.bool,
  data: PropTypes.array,
}

export default TableExamenesConstruccion
