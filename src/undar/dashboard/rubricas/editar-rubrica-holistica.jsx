import React, { useEffect } from 'react'
import FormCreateRubricaHolistica from './components/form/form-create-rubrica-holistica'
import { useParams } from 'react-router'
import { useGetRubrica } from './hooks/use-get-rubrica'
import Bloqueado from '../../components/layout/components/bloqueado'
import Loader from '../../components/layout/components/loader'
import { useNavigate } from 'react-router'
import { useLanguage } from '../../../context/useLanguaje'

const EditarRubricaHolistica = () => {
  const { id: rubrica_holistica_id } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const {
    response: rubrica_holistica,
    isloading,
    getRubrica,
  } = useGetRubrica({
    tipo: 'holistica',
  })

  useEffect(() => {
    getRubrica({ examen_id: rubrica_holistica_id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rubrica_holistica_id])

  if (!rubrica_holistica_id)
    return (
      <Bloqueado
        description={t.rubrics.notFound}
        textButton={t.rubrics.back}
        onClick={() => navigate('/examenes')}
      />
    )
  if (isloading) return <Loader />
  if (!rubrica_holistica)
    return (
      <Bloqueado
        description={t.rubrics.notFound}
        textButton={t.rubrics.back}
        onClick={() => navigate('/examenes')}
      />
    )
  if ((rubrica_holistica?._count?.examenes ?? 0) > 0)
    return (
      <Bloqueado
        description={t.rubrics.blockedEdit}
        textButton={t.rubrics.back}
        onClick={() => navigate('/examenes')}
      />
    )

  return <FormCreateRubricaHolistica rubrica_holistica={rubrica_holistica} />
}

EditarRubricaHolistica.defaultProps = {}

EditarRubricaHolistica.propTypes = {}

export default EditarRubricaHolistica
