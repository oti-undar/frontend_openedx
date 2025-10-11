import { Form, Input } from 'antd'
import React from 'react'

const FormAdicionalesRubrica = () => {
  return (
    <div className='flex gap-4 w-full -mt-4'>
      <div className='flex flex-col gap-2 w-full'>
        <h2 className='text-xl font-semibold '>Competencias:</h2>
        <Form.Item
          hasFeedback
          name='competencias'
          rules={[
            {
              required: true,
              message: 'Por favor ingrese las competencias',
            },
          ]}
        >
          <Input.TextArea
            style={{ resize: 'none' }}
            size='large'
            rows={5}
            allowClear
            placeholder='Ingrese las competencias'
          />
        </Form.Item>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <h2 className='text-xl font-semibold '>Capacidades:</h2>
        <Form.Item
          hasFeedback
          name='capacidades'
          rules={[
            {
              required: true,
              message: 'Por favor ingrese las capacidades',
            },
          ]}
        >
          <Input.TextArea
            style={{ resize: 'none' }}
            size='large'
            rows={5}
            allowClear
            placeholder='Ingrese las capacidades'
          />
        </Form.Item>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <h2 className='text-xl font-semibold '>Desempeños:</h2>
        <Form.Item
          hasFeedback
          name='desempenos'
          rules={[
            {
              required: true,
              message: 'Por favor ingrese los desempeños',
            },
          ]}
        >
          <Input.TextArea
            style={{ resize: 'none' }}
            size='large'
            rows={5}
            allowClear
            placeholder='Ingrese los desempeños'
          />
        </Form.Item>
      </div>
    </div>
  )
}

FormAdicionalesRubrica.defaultProps = {}

FormAdicionalesRubrica.propTypes = {}

export default FormAdicionalesRubrica
