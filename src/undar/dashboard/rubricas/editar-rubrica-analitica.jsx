import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useGetRubrica } from './hooks/use-get-rubrica'
import Bloqueado from '../../components/layout/components/bloqueado'
import Loader from '../../components/layout/components/loader'
import { useNavigate } from 'react-router'
import FormCreateRubricaAnalitica from './components/form/form-create-rubrica-analitica'

const EditarRubricaAnalitica = () => {
  const { id: rubrica_analitica_id } = useParams()
  const navigate = useNavigate()
  const {
    response: rubrica_analitica,
    isloading,
    getRubrica,
  } = useGetRubrica({
    tipo: 'analitica',
  })

  useEffect(() => {
    getRubrica({ examen_id: rubrica_analitica_id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rubrica_analitica_id])

  if (!rubrica_analitica_id)
    return (
      <Bloqueado
        description='Rúbrica no encontrada'
        textButton='Volver'
        onClick={() => navigate('/examenes')}
      />
    )
  if (isloading) return <Loader />
  if (!rubrica_analitica)
    return (
      <Bloqueado
        description='Rúbrica no encontrada'
        textButton='Volver'
        onClick={() => navigate('/examenes')}
      />
    )
  if ((rubrica_analitica?._count?.examenes ?? 0) > 0)
    return (
      <Bloqueado
        description='Esta rúbrica no puede ser editada por que tiene examenes asociados'
        textButton='Volver'
        onClick={() => navigate('/examenes')}
      />
    )

  return <FormCreateRubricaAnalitica rubrica_analitica={rubrica_analitica} />
}

EditarRubricaAnalitica.defaultProps = {}

EditarRubricaAnalitica.propTypes = {}

export default EditarRubricaAnalitica
