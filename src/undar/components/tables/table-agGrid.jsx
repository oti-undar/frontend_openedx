import { AgGridReact } from 'ag-grid-react'
import { columnTypes, themeTable } from './table-theme'
import PropTypes from 'prop-types'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import { AG_GRID_LOCALE_ES } from '../../lib/AG_GRID_LOCALE_ES'
import { forwardRef } from 'react'
import { useLanguage } from '../../../context/useLanguaje'
import { AG_GRID_LOCALE_EN } from '../../lib/AG_GRID_LOCALE_EN'

ModuleRegistry.registerModules([AllCommunityModule])

const TableAgGrid = forwardRef((props, ref) => {
  const { language } = useLanguage()

  return (
    <AgGridReact
      ref={ref}
      {...props}
      theme={themeTable}
      columnTypes={columnTypes}
      localeText={language === 'es' ? AG_GRID_LOCALE_ES : AG_GRID_LOCALE_EN}
    />
  )
})

TableAgGrid.defaultProps = {}

TableAgGrid.propTypes = {
  props: PropTypes.instanceOf(AgGridReact),
}

export default TableAgGrid
