import { utils, writeFile } from 'xlsx'

function exportFile(obj, fileName) {
  const ws = utils.json_to_sheet(obj)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Data')
  writeFile(wb, `${fileName}.xlsx`)
}

export function exportAGGridDataToJSON(gridOptions, fileName) {
  const gridApi = gridOptions.api
  const rowData = []

  const colDefsPrev = gridApi.getAllDisplayedColumns()
  const colDefs = colDefsPrev.filter(col => col.getColDef().type !== 'actions')

  gridApi.forEachNodeAfterFilterAndSort(node => {
    const data = node.data
    const data_obj = {}
    colDefs.forEach(col => {
      const colDef = col.getColDef()
      const field = colDef.field
      const header = colDef.headerName
      const rawValue = data[field]
      let displayValue
      if (typeof colDef.valueFormatter === 'function')
        displayValue = colDef.valueFormatter({
          value: rawValue,
          data,
        })
      else displayValue = rawValue
      data_obj[header] = displayValue
    })
    rowData.push(data_obj)
  })

  exportFile(rowData, fileName)
}
