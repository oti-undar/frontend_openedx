import React, { useEffect } from 'react'
import InicioExamen from './inicio-examen.jsx'
import MostrarPregunta from './mostrar-pregunta.jsx'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import { useSessionStorage } from '../../hooks/useSessionStorage.js'
import { useParams } from 'react-router'
import useFetchData from '../../hooks/useFetchData.js'
import { API_URL } from '../../lib/globales.js'
import qs from 'qs'

const TestearExamen = () => {
  const { id: examen_id } = useParams()

  const [usuario] = useSessionStorage('usuario')
  const user_id = usuario.id

  const { response: test, isloading, fetchData } = useFetchData()
  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL}/examen/${examen_id}?${qs.stringify({
        user_id,
        filters: { state: { name: 'Disponible' } },
      })}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examen_id])

  const [examenActual, setExamenActual] = useLocalStorage(
    `${user_id}-${examen_id ?? ''}`,
    {
      fin_examen: null,
      pregunta_actual: null,
      preguntas_resueltas: [],
      preguntas: test?.preguntas,
    }
  )

  if (!examen_id) return <div>Examen no encontrado</div>
  if (isloading) return <div>Cargando...</div>
  if (!test) return <div>Examen no encontrado</div>

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
