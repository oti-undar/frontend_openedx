import { Tabs } from 'antd'
import React from 'react'
import FormCreateRubricaHolistica from './components/form/form-create-rubrica-holistica'
import FormCreateRubricaAnalitica from './components/form/form-create-rubrica-analitica'

const Rubricas = () => {
  const items = [
    {
      key: '1',
      label: 'Rúbrica Holística',
      children: <FormCreateRubricaHolistica />,
    },
    {
      key: '2',
      label: 'Rúbrica Analítica',
      children: <FormCreateRubricaAnalitica />,
    },
  ]

  return <Tabs defaultActiveKey='1' items={items} />
}

Rubricas.defaultProps = {}

Rubricas.propTypes = {}

export default Rubricas
