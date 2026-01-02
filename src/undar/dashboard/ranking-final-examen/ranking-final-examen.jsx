import React, { useEffect } from 'react'
import RankingRowWinner from './components/cards/ranking-row-winner'
import Confetti from 'react-confetti-boom'
import { useParams } from 'react-router'
import useFetchData from '../../hooks/useFetchData'
import { API_URL, states } from '../../lib/globales'
import Bloqueado from '../../components/layout/components/bloqueado'
import Loader from '../../components/layout/components/loader'
import { getUserAuth } from '../../utils/api-openEdx'
import { includeGetExamenTiempoReal } from '../ranking-tiempo-real/hooks/use-get-examen-tiempo-real'
import { useLanguage } from '../../../context/useLanguaje'

const RankingFinalExamen = () => {
  const { id: examen_id } = useParams()
  const user_id = getUserAuth().userId
  const { t } = useLanguage()

  const { response: examenActual, isloading, fetchData } = useFetchData()
  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/examen/${examen_id}?filters=${encodeURIComponent(
        JSON.stringify({
          state: { name: states.Finalizado },
          user_id,
        })
      )}&includes=${encodeURIComponent(
        JSON.stringify(includeGetExamenTiempoReal)
      )}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examen_id, user_id])

  const puntosTotales =
    examenActual?.preguntas?.reduce(
      (total, pregunta) => total + pregunta.puntos,
      0
    ) ?? 1

  const alumnos = examenActual?.curso?.usuarios
    ?.filter((usuario) => usuario.user.id !== user_id)
    ?.map((usuario) => {
      const examen_resuelto_actual = usuario.user.examenes_resueltos?.find(
        (examen) => examen.examen_id === examen_id
      )
      const puntos_obtenidos =
        examen_resuelto_actual?.preguntas_resueltas?.reduce(
          (total, pregunta_resuelta) =>
            total +
            (pregunta_resuelta?.respuesta?.correcta
              ? pregunta_resuelta?.pregunta?.puntos ?? 0
              : 0),
          0
        ) ?? 0

      const nota = (puntos_obtenidos * 20) / puntosTotales
      return {
        id: usuario.user.id,
        nombre: usuario.user.first_name,
        apellido: usuario.user.last_name,
        username: usuario.user.username,
        nota,
        avatar: usuario.user.avatar,
      }
    })
  const alumnosOrdenados = alumnos?.sort((a, b) => b.nota - a.nota)
  const primeros3 = alumnosOrdenados?.slice(0, 3)

  if (!examen_id)
    return (
      <Bloqueado
        description={t.studentExam.notFound}
        textButton={t.studentExam.backToHome}
        onClick={() => (window.location.href = '/')}
      />
    )
  if (isloading) return <Loader />
  if (!examenActual)
    return (
      <Bloqueado
        description={t.studentExam.notFound}
        textButton={t.studentExam.backToHome}
        onClick={() => (window.location.href = '/')}
      />
    )

  return (
    <div className='flex flex-col gap-4 size-full py-8 px-12 text-center'>
      <Confetti mode='fall' />
      <h1 className='text-5xl font-bold animate-fade-right animate-ease-in-out'>
        {examenActual.title}
      </h1>
      <h2 className='text-xl font-semibold text-gray-500 -mt-2 animate-fade-left animate-delay-500 animate-ease-in-out'>
        {examenActual.curso.name}
      </h2>
      <div className='flex gap-16 mt-8 justify-center items-center size-full'>
        <RankingRowWinner
          name={primeros3?.[1]?.nombre}
          lastName={primeros3?.[1]?.apellido}
          username={primeros3?.[1]?.username}
          avatar={primeros3?.[1]?.avatar}
        />
        <RankingRowWinner
          name={primeros3?.[0]?.nombre}
          lastName={primeros3?.[0]?.apellido}
          username={primeros3?.[0]?.username}
          first
          avatar={primeros3?.[0]?.avatar}
        />
        <RankingRowWinner
          name={primeros3?.[2]?.nombre}
          lastName={primeros3?.[2]?.apellido}
          username={primeros3?.[2]?.username}
          avatar={primeros3?.[2]?.avatar}
        />
      </div>
    </div>
  )
}

RankingFinalExamen.defaultProps = {}

RankingFinalExamen.propTypes = {}

export default RankingFinalExamen
