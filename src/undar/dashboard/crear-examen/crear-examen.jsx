import React, { useEffect } from 'react'
import FormCrearExamen from './components/form/form-crear-examen'
import { useGetExamen } from '../editar-examen/hooks/use-get-examen'
import { useSearchParams } from 'react-router-dom'
import Loader from '../../components/layout/components/loader'

const CrearExamen = () => {
  const [searchParams] = useSearchParams()
  const examen_id = searchParams.get('examen_id')

  const { examen, isloading, getExamen } = useGetExamen({ activo: false })

  useEffect(() => {
    if (examen_id) getExamen({ examen_id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examen_id])

  const examen_formated = examen
    ? {
        ...examen,
        inicio_examen: null,
        final_examen: null,
      }
    : undefined

  if (isloading) return <Loader />
  return (
    <div className='flex flex-col gap-4 h-full w-full'>
      <FormCrearExamen examen={examen_formated} creacion={true} />
    </div>
  )
}

CrearExamen.defaultProps = {}

CrearExamen.propTypes = {}

export default CrearExamen
