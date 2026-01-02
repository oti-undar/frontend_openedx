import { Form, Input } from 'antd'
import React from 'react'
import { useLanguage } from '../../../../../context/useLanguaje'

const FormAdicionalesRubrica = () => {
  const { t } = useLanguage()
  return (
    <div className='flex gap-4 w-full -mt-4'>
      <div className='flex flex-col gap-2 w-full'>
        <h2 className='text-xl font-semibold '>
          {t.rubrics.additional.competenciesTitle}
        </h2>
        <Form.Item
          hasFeedback
          name='competencias'
          rules={[
            {
              required: true,
              message: t.rubrics.additional.competenciesError,
            },
          ]}
        >
          <Input.TextArea
            style={{ resize: 'none' }}
            size='large'
            rows={5}
            allowClear
            placeholder={t.rubrics.additional.competenciesPlaceholder}
          />
        </Form.Item>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <h2 className='text-xl font-semibold '>
          {t.rubrics.additional.capacitiesTitle}
        </h2>
        <Form.Item
          hasFeedback
          name='capacidades'
          rules={[
            {
              required: true,
              message: t.rubrics.additional.capacitiesError,
            },
          ]}
        >
          <Input.TextArea
            style={{ resize: 'none' }}
            size='large'
            rows={5}
            allowClear
            placeholder={t.rubrics.additional.capacitiesPlaceholder}
          />
        </Form.Item>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <h2 className='text-xl font-semibold '>
          {t.rubrics.additional.performancesTitle}
        </h2>
        <Form.Item
          hasFeedback
          name='desempenos'
          rules={[
            {
              required: true,
              message: t.rubrics.additional.performancesError,
            },
          ]}
        >
          <Input.TextArea
            style={{ resize: 'none' }}
            size='large'
            rows={5}
            allowClear
            placeholder={t.rubrics.additional.performancesPlaceholder}
          />
        </Form.Item>
      </div>
    </div>
  )
}

FormAdicionalesRubrica.defaultProps = {}

FormAdicionalesRubrica.propTypes = {}

export default FormAdicionalesRubrica
