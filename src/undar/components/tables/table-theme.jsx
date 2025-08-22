import { themeQuartz, iconSetQuartzLight } from 'ag-grid-community'

export const themeTable = themeQuartz.withPart(iconSetQuartzLight).withParams({
  backgroundColor: '#ffffff',
  browserColorScheme: 'light',
  columnBorder: false,
  fontFamily: 'Arial',
  foregroundColor: 'rgb(46, 55, 66)',
  headerBackgroundColor: '#F9FAFB',
  headerFontSize: 14,
  headerFontWeight: 600,
  headerTextColor: '#374151',
  oddRowBackgroundColor: '#F9FAFB',
  rowBorder: false,
  sidePanelBorder: false,
  spacing: 8,
  wrapperBorder: false,
  wrapperBorderRadius: 0,
})

export const columnTypes = {
  currency: {
    width: 150,
    valueFormatter: params =>
      params.value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
  },
  shaded: {
    cellClass: 'shaded-class',
  },
}
