import React, { useEffect } from 'react'
import InicioExamen from './inicio-examen.jsx'
import MostrarPregunta from './mostrar-pregunta.jsx'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import useFetchData from '../../hooks/useFetchData.js'
import { API_URL } from '../../lib/globales.js'
import { getUserAuth } from '../../utils/api-openEdx.js'
import Loader from '../../components/layout/components/loader.jsx'
import Bloqueado from '../../components/layout/components/bloqueado.jsx'
import { useNavigate, useParams } from 'react-router'
import { useLanguage } from '../../../context/useLanguaje.js'

const TestearExamen = () => {
  const { id: examen_id } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const user_id = getUserAuth().userId

  const { response: test, isloading, fetchData } = useFetchData()

  const [examenActual, setExamenActual] = useLocalStorage(
    `${user_id}-${examen_id ?? ''}`,
    {
      fin_examen: null,
      pregunta_actual: null,
      preguntas_resueltas: [],
      preguntas: test?.preguntas,
    }
  )

  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/examen/${examen_id}?filters=${encodeURIComponent(
        JSON.stringify({ user_id })
      )}`,
      onSuccess: (data) => {
        setExamenActual((prev) => ({
          ...prev,
          preguntas: data.preguntas,
        }))
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examen_id])

  if (!examen_id)
    return (
      <Bloqueado
        description={t.testExam.notFound}
        textButton={t.testExam.backToDashboard}
        onClick={() => navigate('/dashboard')}
      />
    )
  if (isloading) return <Loader />
  if (!test)
    return (
      <Bloqueado
        description={t.testExam.notFound}
        textButton={t.testExam.backToDashboard}
        onClick={() => navigate('/dashboard')}
      />
    )

  return (
    <div className='flex flex-col gap-4 size-full py-8 px-12 overflow-y-auto rounded-2xl overflow-x-hidden relative'>
      {!examenActual?.pregunta_actual ? (
        <InicioExamen test={test} setExamenActual={setExamenActual} />
      ) : (
        <MostrarPregunta
          pregunta={examenActual.pregunta_actual}
          examenActual={examenActual}
          setExamenActual={setExamenActual}
        />
      )}
    </div>
  )
}

TestearExamen.defaultProps = {}

TestearExamen.propTypes = {}

export default TestearExamen
