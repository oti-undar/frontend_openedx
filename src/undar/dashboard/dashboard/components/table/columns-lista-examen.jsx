import React from 'react'

const useColumnsListaExamen = () => [
  {
    headerName: 'Curso',
    field: 'curso.name',
    minWidth: 200,
    filter: true,
    flex: 2,
  },
  {
    headerName: 'Título',
    field: 'title',
    minWidth: 200,
    filter: true,
    flex: 2,
  },
  {
    headerName: 'N° Inscritos',
    field: 'inscritos',
    minWidth: 110,
    filter: 'agNumberColumnFilter',
    flex: 1,
  },
  {
    headerName: 'Aprobados',
    field: 'aprobados',
    minWidth: 110,
    filter: 'agNumberColumnFilter',
    flex: 1,
  },
]

useColumnsListaExamen.defaultProps = {}

useColumnsListaExamen.propTypes = {}

export default useColumnsListaExamen
