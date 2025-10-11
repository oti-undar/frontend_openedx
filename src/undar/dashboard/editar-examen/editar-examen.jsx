import React, { useEffect } from 'react'
import FormCrearExamen from '../crear-examen/components/form/form-crear-examen'
import { useParams } from 'react-router'
import { useGetExamen } from './hooks/use-get-examen'
import Bloqueado from '../../components/layout/components/bloqueado'
import Loader from '../../components/layout/components/loader'

const EditarExamen = () => {
  const { id: examen_id } = useParams()

  const { examen, isloading, getExamen } = useGetExamen()

  useEffect(() => {
    getExamen({ examen_id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examen_id])

  if (!examen_id)
    return (
      <Bloqueado
        description='Examen no encontrado'
        textButton='Volver al inicio'
        onClick={() => (window.location.href = '/')}
      />
    )
  if (isloading) return <Loader />
  if (!examen)
    return (
      <Bloqueado
        description='Examen no encontrado'
        textButton='Volver al inicio'
        onClick={() => (window.location.href = '/')}
      />
    )

  return (
    <div className='flex flex-col gap-4 h-full w-full'>
      <FormCrearExamen examen={examen} />
    </div>
  )
}

EditarExamen.defaultProps = {}

EditarExamen.propTypes = {}

export default EditarExamen
