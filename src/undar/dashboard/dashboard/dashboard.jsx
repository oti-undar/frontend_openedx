import React, { useEffect, useRef, useState } from 'react'
import TableListaExamen from './components/table/table-lista-examen'
import { PiStudentFill } from 'react-icons/pi'
import { MdWorkHistory } from 'react-icons/md'
import CardResumeDashboard from './components/cards/card-resume-dashboard'
import { GrTest } from 'react-icons/gr'
import { FaAddressBook } from 'react-icons/fa'
import TableExamenesConstruccion from './components/table/table-examenes-construccion'
import TableTitle from '../../components/tables/table-title'
import { exportAGGridDataToJSON } from '../../utils/ag-grid'
import useFetchData from '../../hooks/useFetchData'
import { API_URL, states } from '../../lib/globales'
import qs from 'qs'
import { getUserAuth } from '../../utils/api-openEdx'

const Dashboard = () => {
  const listaExamenRef = useRef()
  const examenesConstruccionRef = useRef()

  const user_id = getUserAuth().userId

  const { response, isloading, fetchData } = useFetchData()
  const { response: cursos, fetchData: fetchCursos } = useFetchData()
  const [reFetchExamenes, setReFetchExamenes] = useState(0)

  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/examen?${qs.stringify({
        user_id,
      })}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reFetchExamenes])
  useEffect(() => {
    fetchCursos({
      method: 'GET',
      url: `${API_URL()}/curso?${qs.stringify({
        user_id,
      })}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const exportarListaExamen = () =>
    exportAGGridDataToJSON(listaExamenRef.current, 'Exámenes Realizados')

  const exportarExamenesConstruccion = () =>
    exportAGGridDataToJSON(
      examenesConstruccionRef.current,
      'Exámenes en Construcción'
    )

  return (
    <div className='flex flex-col gap-8 h-full'>
      <div className='flex gap-8 justify-between'>
        <CardResumeDashboard
          title='Exámenes realizados'
          description={
            response?.filter(exam => exam.state?.name === states.Finalizado)
              ?.length ?? 0
          }
          icon={<MdWorkHistory size={70} className='text-lime-500' />}
        />
        <CardResumeDashboard
          title='Exámenes en construcción'
          description={
            response?.filter(exam => exam.state?.name === states.Activo)
              ?.length ?? 0
          }
          icon={<GrTest size={60} className='text-lime-500' />}
        />
        <CardResumeDashboard
          title='Total de Alumnos inscritos'
          description={
            cursos?.reduce(
              (acc, curso) =>
                acc + curso.usuarios.filter(user => !user.is_instructor).length,
              0
            ) ?? 0
          }
          icon={<PiStudentFill size={70} className='text-lime-500' />}
        />
        <CardResumeDashboard
          title='Cursos asignados'
          description={cursos?.length ?? 0}
          icon={<FaAddressBook size={60} className='text-lime-500' />}
        />
      </div>
      <div className='grid grid-cols-3 gap-8 h-full'>
        <TableTitle
          title='Exámenes Realizados'
          className='col-span-2'
          onExport={exportarListaExamen}
        >
          <TableListaExamen
            ref={listaExamenRef}
            isloading={isloading}
            data={response?.filter(
              exam => exam.state?.name === states.Finalizado
            )}
          />
        </TableTitle>
        <TableTitle
          title='En construcción'
          className='col-span-1'
          onExport={exportarExamenesConstruccion}
        >
          <TableExamenesConstruccion
            setReFetchExamenes={setReFetchExamenes}
            ref={examenesConstruccionRef}
            isloading={isloading}
            data={response?.filter(exam => exam.state?.name === states.Activo)}
          />
        </TableTitle>
      </div>
    </div>
  )
}

Dashboard.defaultProps = {}

Dashboard.propTypes = {}

export default Dashboard
