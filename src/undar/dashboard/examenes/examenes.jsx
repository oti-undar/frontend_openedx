import React, { useRef, useState } from 'react'
import TableExamenes from './components/table/table-examenes'
import TableAlumnosInscritos from './components/table/table-alumnos-inscritos'
import TableDetallesAlumnoExamen from './components/table/table-detalles-alumno-examen'
import TableTitle from '../../components/tables/table-title'
import { exportAGGridDataToJSON } from '../../utils/ag-grid'
import TableRubricasHolisticas from '../rubricas/components/table/table-rubricas-holisticas'
import TableRubricasAnaliticas from '../rubricas/components/table/table-rubricas-analiticas'
import { useLanguage } from '../../../context/useLanguaje'

const Examenes = () => {
  const examenesRef = useRef()
  const alumnosInscritosRef = useRef()
  const detallesAlumnosRef = useRef()
  const { t } = useLanguage()

  const exportarExamenes = () =>
    exportAGGridDataToJSON(examenesRef.current, t.exams.title)

  const exportarAlumnosInscritos = () =>
    exportAGGridDataToJSON(
      alumnosInscritosRef.current,
      t.exams.enrolledStudents
    )

  const exportarDetallesAlumnos = () =>
    exportAGGridDataToJSON(detallesAlumnosRef.current, t.exams.studentDetails)

  const [examenSeleccionado, setExamenSeleccionado] = useState()
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState()

  return (
    <div className='flex flex-col gap-8 h-full'>
      <div className='grid grid-cols-8 gap-8 h-full w-full'>
        <TableTitle
          title={t.exams.title}
          onExport={exportarExamenes}
          className='col-span-4'
        >
          <TableExamenes
            ref={examenesRef}
            setExamenSeleccionado={setExamenSeleccionado}
          />
        </TableTitle>
        <TableTitle
          title={t.exams.holisticRubrics}
          className='col-span-2'
          showExportButton={false}
        >
          <TableRubricasHolisticas />
        </TableTitle>
        <TableTitle
          title={t.exams.analyticRubrics}
          className='col-span-2'
          showExportButton={false}
        >
          <TableRubricasAnaliticas />
        </TableTitle>
      </div>
      <div className='grid grid-cols-4 gap-8 h-full'>
        <TableTitle
          title={t.exams.enrolledStudents}
          className='col-span-2'
          onExport={exportarAlumnosInscritos}
        >
          <TableAlumnosInscritos
            ref={alumnosInscritosRef}
            examenSeleccionado={examenSeleccionado}
            setAlumnoSeleccionado={setAlumnoSeleccionado}
            alumnoSeleccionado={alumnoSeleccionado}
          />
        </TableTitle>
        <TableTitle
          title={t.exams.details}
          className='col-span-2'
          onExport={exportarDetallesAlumnos}
        >
          <TableDetallesAlumnoExamen
            ref={detallesAlumnosRef}
            examenSeleccionado={examenSeleccionado}
            alumnoSeleccionado={alumnoSeleccionado}
          />
        </TableTitle>
      </div>
    </div>
  )
}

Examenes.defaultProps = {}

Examenes.propTypes = {}

export default Examenes
