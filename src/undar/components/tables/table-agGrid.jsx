import { AgGridReact } from 'ag-grid-react'
import { columnTypes, themeTable } from './table-theme'
import PropTypes from 'prop-types'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import { AG_GRID_LOCALE_ES } from '../../lib/AG_GRID_LOCALE_ES'
import { forwardRef } from 'react'

ModuleRegistry.registerModules([AllCommunityModule])

const TableAgGrid = forwardRef((props, ref) => (
  <AgGridReact
    ref={ref}
    {...props}
    theme={themeTable}
    columnTypes={columnTypes}
    localeText={AG_GRID_LOCALE_ES}
  />
))

TableAgGrid.defaultProps = {}

TableAgGrid.propTypes = {
  props: PropTypes.instanceOf(AgGridReact),
}

export default TableAgGrid
