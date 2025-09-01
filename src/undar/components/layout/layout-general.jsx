import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { validarOCrearCookieActualizarData } from '../../utils/cookies'
import { useActualizarData } from '../../hooks/use-actualizar-data'
import useFetchData from '../../hooks/useFetchData'
import { API_URL } from '../../lib/globales'
import qs from 'qs'
import { getUserAuth } from '../../utils/api-openEdx'
import Loader from './components/loader'
import Bloqueado from './components/bloqueado'

const LayoutGeneral = () => {
  const { actualizarData, isloading: isloadingActualizarData } =
    useActualizarData()
  const user_id = getUserAuth().userId

  const [reFetch, setReFetch] = useState(0)

  const { response, fetchData, isloading } = useFetchData()
  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/api_open_edx/is-instructor?${qs.stringify({
        user_id,
      })}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reFetch])

  useEffect(() => {
    validarOCrearCookieActualizarData({
      onCreateCookie: () => {
        actualizarData({
          onSuccess: () => setReFetch(prev => prev + 1),
        })
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isloading || isloadingActualizarData || response === undefined)
    return <Loader />

  if (!isloading && !isloadingActualizarData && !response?.is_instructor)
    return (
      <Bloqueado
        description='Debes ser Instructor para acceder a esta sección'
        textButton='Volver al inicio'
        onClick={() => (window.location.href = '/')}
      />
    )

  return <Outlet />
}

LayoutGeneral.defaultProps = {}

LayoutGeneral.propTypes = {}

export default LayoutGeneral
