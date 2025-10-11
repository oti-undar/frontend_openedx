import { Button, Form, Input, InputNumber, notification } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { FaCircleXmark } from 'react-icons/fa6'

const FormCreateNivelesDeLogroAnalitica = ({ indicador, form }) => (
  <Form.List
    name={[indicador, 'niveles_de_logro']}
    rules={[
      {
        required: true,
        message: 'Por favor ingrese los niveles de logro',
        validator: (_, value) => {
          if (!value.length) {
            notification.error({
              message: 'Error',
              description: 'Por favor ingrese al menos un nivel de logro',
            })
            return Promise.reject(
              new Error('Por favor ingrese al menos un nivel de logro')
            )
          }

          if (value.some(level => level.desde === '' || level.hasta === '')) {
            notification.error({
              message: 'Error',
              description: `Por favor ingrese todos los valores del indicador ${
                indicador + 1
              }`,
            })
            return Promise.reject(
              new Error('Por favor ingrese todos los valores')
            )
          }

          if (value.some(level => Number(level.desde) > Number(level.hasta))) {
            notification.error({
              message: 'Error',
              description: `Los valores Desde no pueden ser mayores a los valores Hasta en el indicador ${
                indicador + 1
              }`,
            })
            return Promise.reject(
              new Error(
                'Los valores Desde no pueden ser mayores a los valores Hasta'
              )
            )
          }

          const levels = value.map(level =>
            Array.from(
              { length: Number(level.hasta) - Number(level.desde) + 1 },
              (_, i) => i + Number(level.desde)
            )
          )

          const areThereDuplicates = levels.some((level, index) => {
            return levels.slice(index + 1).some(otherLevel => {
              return level.some(number => otherLevel.includes(number))
            })
          })

          if (areThereDuplicates) {
            notification.error({
              message: 'Error',
              description: `Hay notas repetidas entre los niveles de logro del indicador ${
                indicador + 1
              }`,
            })
            return Promise.reject(
              new Error('Hay notas repetidas entre los niveles de logro')
            )
          }

          const allNumbers = Array.from({ length: 21 }, (_, i) => i)

          const notas = levels.flat()

          const difference = allNumbers.filter(
            number => !notas.includes(number)
          )
          if (difference.length > 0) {
            const isPlural = difference.length > 1
            notification.error({
              message: 'Error',
              description: `Falta${isPlural ? 'n' : ''} la${
                isPlural ? 's' : ''
              } nota${isPlural ? 's' : ''} ${difference.join(
                ', '
              )} en los niveles de logro del indicador ${indicador + 1}`,
            })
            return Promise.reject(
              new Error(
                `Falta${isPlural ? 'n' : ''} la${isPlural ? 's' : ''} nota${
                  isPlural ? 's' : ''
                } ${difference.join(', ')} en los niveles de logro`
              )
            )
          }

          return Promise.resolve()
        },
      },
    ]}
  >
    {(niveles_de_logro, { add, remove }) => (
      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 overflow-y-auto max-h-full rounded-xl px-3'>
        {niveles_de_logro.map(nivel => {
          return (
            <div
              className='flex flex-col bg-white rounded-xl p-7 shadow-lg w-full max-w-[300px]'
              key={nivel.key}
            >
              <div className='flex gap-2 w-full items-center'>
                <div className='text-2xl font-semibold mb-6'>
                  {nivel.name + 1}.
                </div>
                <Form.Item
                  hasFeedback
                  name={[nivel.name, 'name']}
                  className='w-full'
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingrese el nombre del nivel de logro',
                    },
                  ]}
                >
                  <Input
                    size='large'
                    allowClear
                    placeholder='Nombre del nivel'
                    onChange={e => {
                      const indicadores = form.getFieldValue('indicadores')
                      indicadores.forEach((_, index) => {
                        if (index !== indicador)
                          form.setFieldValue(
                            [
                              'indicadores',
                              index,
                              'niveles_de_logro',
                              nivel.name,
                              'name',
                            ],
                            e.target.value
                          )
                      })
                    }}
                  />
                </Form.Item>
                {nivel.name !== 0 && (
                  <FaCircleXmark
                    size={30}
                    onClick={() => {
                      const indicadores = form.getFieldValue('indicadores')
                      indicadores.forEach((_, index) => {
                        if (index !== indicador) {
                          const niveles_de_logro_aux = form.getFieldValue([
                            'indicadores',
                            index,
                            'niveles_de_logro',
                          ])
                          form.setFieldValue(
                            ['indicadores', index, 'niveles_de_logro'],
                            niveles_de_logro_aux.filter(
                              (_, ind) => ind !== nivel.name
                            )
                          )
                        }
                      })
                      remove(nivel.name)
                    }}
                    className={`text-rose-300 hover:text-rose-500 hover:scale-110 cursor-pointer transition-all ml-2 mb-6`}
                  />
                )}
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <h2 className='text-xl font-semibold '>Criterios del nivel:</h2>
                <Form.Item
                  hasFeedback
                  name={[nivel.name, 'criterios']}
                  rules={[
                    {
                      required: true,
                      message:
                        'Por favor ingrese los criterios del nivel de logro',
                    },
                  ]}
                >
                  <Input.TextArea
                    style={{ resize: 'none' }}
                    size='large'
                    rows={5}
                    allowClear
                    placeholder='Ingrese los criterios del nivel de logro'
                  />
                </Form.Item>
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <h2 className='text-xl font-semibold '>Notas Requeridas:</h2>
                <div className='flex gap-2 items-center justify-between'>
                  <Form.Item
                    hasFeedback
                    name={[nivel.name, 'desde']}
                    rules={[
                      {
                        required: true,
                        message:
                          'Por favor ingrese la nota minima del nivel de logro',
                      },
                    ]}
                  >
                    <InputNumber
                      step={1}
                      min={0}
                      max={20}
                      type='number'
                      precision={0}
                      allowClear
                      controls={false}
                      placeholder='Desde'
                    />
                  </Form.Item>
                  <span className='text-xl font-semibold mb-7'>-</span>
                  <Form.Item
                    hasFeedback
                    name={[nivel.name, 'hasta']}
                    rules={[
                      {
                        required: true,
                        message: 'Ingrese la nota maxima del nivel de logro',
                      },
                    ]}
                    className='w-full'
                  >
                    <InputNumber
                      step={1}
                      min={0}
                      max={20}
                      type='number'
                      precision={0}
                      allowClear
                      controls={false}
                      placeholder='Hasta'
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          )
        })}

        <Button
          className='font-bold text-slate-500 w-full py-3'
          type='dashed'
          size='large'
          onClick={() => {
            const indicadores = form.getFieldValue('indicadores')
            indicadores.forEach((_, index) => {
              if (index !== indicador) {
                const niveles_de_logro_aux = form.getFieldValue([
                  'indicadores',
                  index,
                  'niveles_de_logro',
                ])
                form.setFieldValue(
                  ['indicadores', index, 'niveles_de_logro'],
                  [...niveles_de_logro_aux, {}]
                )
              }
            })
            add()
          }}
          block
        >
          + Agregar nivel
        </Button>
      </div>
    )}
  </Form.List>
)

FormCreateNivelesDeLogroAnalitica.defaultProps = {}

FormCreateNivelesDeLogroAnalitica.propTypes = {
  indicador: PropTypes.number.isRequired,
  form: PropTypes.object.isRequired,
}

export default FormCreateNivelesDeLogroAnalitica
