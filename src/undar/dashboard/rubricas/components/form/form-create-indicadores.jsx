import { Button, Form, Input, notification } from 'antd'
import React from 'react'
import { FaCircleXmark } from 'react-icons/fa6'
import FormCreateNivelesDeLogroAnalitica from './form-create-niveles-de-logro-analitica'
import PropTypes from 'prop-types'
import { useLanguage } from '../../../../../context/useLanguaje'

const FormCreateIndicadores = ({ form }) => {
  const { t } = useLanguage()

  return (
    <Form.List
      name='indicadores'
      rules={[
        {
          required: true,
          message: t.rubrics.indicators.errorRequired,
          validator: (_, value) => {
            if (!value.length) {
              notification.error({
                message: 'Error',
                description: t.rubrics.indicators.errorMin,
              })
              return Promise.reject(new Error(t.rubrics.indicators.errorMin))
            }

            return Promise.resolve()
          },
        },
      ]}
    >
      {(indicadores, { add, remove }) => (
        <div className='flex flex-col gap-4 overflow-auto max-h-full rounded-xl px-3'>
          {indicadores.map((indicador) => {
            return (
              <div
                className='flex flex-col bg-white rounded-xl p-7 shadow-lg w-full'
                key={indicador.key}
              >
                <div className='flex flex-col gap-4 w-full'>
                  <div className='flex gap-2 w-full items-center'>
                    <div className='text-2xl font-semibold mb-6'>
                      {indicador.name + 1}.
                    </div>
                    <Form.Item
                      hasFeedback
                      name={[indicador.name, 'name']}
                      className='w-full max-w-[600px]'
                      rules={[
                        {
                          required: true,
                          message: t.rubrics.indicators.nameError,
                        },
                      ]}
                    >
                      <Input
                        size='large'
                        allowClear
                        placeholder={t.rubrics.indicators.namePlaceholder}
                      />
                    </Form.Item>
                    {indicador.name !== 0 && (
                      <FaCircleXmark
                        size={30}
                        onClick={() => remove(indicador.name)}
                        className={`text-rose-300 hover:text-rose-500 hover:scale-110 cursor-pointer transition-all ml-2 mb-6`}
                      />
                    )}
                  </div>
                  <FormCreateNivelesDeLogroAnalitica
                    indicador={indicador.name}
                    form={form}
                  />
                </div>
              </div>
            )
          })}

          <Button
            className='font-bold text-slate-500 w-full py-3'
            type='dashed'
            size='large'
            onClick={() => add({ niveles_de_logro: [{}, {}, {}, {}] })}
            block
          >
            {t.rubrics.indicators.addIndicator}
          </Button>
        </div>
      )}
    </Form.List>
  )
}

FormCreateIndicadores.defaultProps = {}

FormCreateIndicadores.propTypes = {
  form: PropTypes.object.isRequired,
}

export default FormCreateIndicadores
