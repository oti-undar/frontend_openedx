import { Tabs } from 'antd'
import React from 'react'
import FormCreateRubricaHolistica from './components/form/form-create-rubrica-holistica'
import FormCreateRubricaAnalitica from './components/form/form-create-rubrica-analitica'
import { useLanguage } from '../../../context/useLanguaje'

const Rubricas = () => {
  const { t } = useLanguage()

  const items = [
    {
      key: '1',
      label: t.rubrics.holistic,
      children: <FormCreateRubricaHolistica />,
    },
    {
      key: '2',
      label: t.rubrics.analytic,
      children: <FormCreateRubricaAnalitica />,
    },
  ]

  return <Tabs defaultActiveKey='1' items={items} />
}

Rubricas.defaultProps = {}

Rubricas.propTypes = {}

export default Rubricas
