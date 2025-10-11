import { utils, writeFile } from 'xlsx-js-style'

export function exportHolistica(obj, fileName, titles) {
  const ws = utils.json_to_sheet(obj, { origin: 'A2' })
  const groupSize = 3
  titles.forEach((title, i) => {
    const startCol = i * groupSize
    const endCol = startCol + groupSize - 1
    const cellRef = utils.encode_cell({ r: 0, c: startCol })
    utils.sheet_add_aoa(ws, [[title]], { origin: cellRef })

    ws[cellRef].s = {
      alignment: {
        horizontal: 'center',
        vertical: 'center',
      },
      font: { bold: true, sz: 13 },
      fill: { fgColor: { rgb: '3b82f6' } },
    }

    if (!ws['!merges']) ws['!merges'] = []
    ws['!merges'].push({
      s: { r: 0, c: startCol },
      e: { r: 0, c: endCol },
    })
  })

  // Hacer fila 2 en negrita (encabezados)
  const headerRow = 2
  const headers = Object.keys(obj[0])
  headers.forEach((_, i) => {
    const cell = utils.encode_cell({ r: headerRow - 1, c: i })
    if (ws[cell]) {
      ws[cell].s = {
        alignment: {
          horizontal: 'center',
          vertical: 'center',
        },
        font: { bold: true },
        fill: { fgColor: { rgb: '3b82f6' } },
      }
    }
  })

  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Data')
  writeFile(wb, `${fileName}.xlsx`)
}

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
