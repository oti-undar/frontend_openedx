import React, { useRef, useState } from 'react'
import TableTitle from '../../components/tables/table-title'
import TableCursos from './components/table/table-cursos'
import TableDetallesAlumnoCurso from './components/table/table-detalles-alumno-curso'
import { exportAGGridDataToJSON } from '../../utils/ag-grid'
import { useLanguage } from '../../../context/useLanguaje'

const Cursos = () => {
  const cursosRef = useRef()
  const detallesAlumnoRef = useRef()
  const { t } = useLanguage()

  const exportarCursos = () =>
    exportAGGridDataToJSON(cursosRef.current, t.courses.title)

  const exportarDetallesAlumno = () =>
    exportAGGridDataToJSON(detallesAlumnoRef.current, t.courses.studentDetails)

  const [cursoSeleccionado, setCursoSeleccionado] = useState()

  return (
    <div className='flex flex-col gap-8 h-full'>
      <div className='grid grid-cols-3 gap-8 h-full'>
        <TableTitle
          title={t.courses.title}
          className='col-span-1'
          onExport={exportarCursos}
        >
          <TableCursos
            ref={cursosRef}
            setCursoSeleccionado={setCursoSeleccionado}
          />
        </TableTitle>
        <TableTitle
          title={t.courses.details}
          className='col-span-2'
          onExport={exportarDetallesAlumno}
        >
          <TableDetallesAlumnoCurso
            ref={detallesAlumnoRef}
            cursoSeleccionado={cursoSeleccionado}
          />
        </TableTitle>
      </div>
    </div>
  )
}

Cursos.defaultProps = {}

Cursos.propTypes = {}

export default Cursos
