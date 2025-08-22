import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import TableAgGrid from '../../../../components/tables/table-agGrid'
import useColumnsListaExamen from './columns-lista-examen'

const TableListaExamen = forwardRef(({ isloading, data }, ref) => (
  <TableAgGrid
    ref={ref}
    rowData={data}
    columnDefs={useColumnsListaExamen()}
    loading={isloading}
  />
))

TableListaExamen.defaultProps = {
  isloading: false,
  data: [],
}

TableListaExamen.propTypes = {
  isloading: PropTypes.bool,
  data: PropTypes.array,
}

export default TableListaExamen
