import { Button, Form, Input, InputNumber, notification } from 'antd'
import React from 'react'
import { FaCircleXmark } from 'react-icons/fa6'
import { useLanguage } from '../../../../../context/useLanguaje'

const FormCreateNivelesDeLogro = () => {
  const { t } = useLanguage()

  return (
    <Form.List
      name='niveles_de_logro'
      rules={[
        {
          required: true,
          message: t.rubrics.levels.errorRequired,
          validator: (_, value) => {
            if (!value.length) {
              notification.error({
                message: t.common.error,
                description: t.rubrics.levels.errorMin,
              })
              return Promise.reject(new Error(t.rubrics.levels.errorMin))
            }

            if (
              value.some((level) => level.desde === '' || level.hasta === '')
            ) {
              notification.error({
                message: t.common.error,
                description: t.rubrics.levels.errorValues,
              })
              return Promise.reject(new Error(t.rubrics.levels.errorValues))
            }

            if (
              value.some((level) => Number(level.desde) > Number(level.hasta))
            ) {
              notification.error({
                message: t.common.error,
                description: t.rubrics.levels.errorRange,
              })
              return Promise.reject(new Error(t.rubrics.levels.errorRange))
            }

            const levels = value.map((level) =>
              Array.from(
                { length: Number(level.hasta) - Number(level.desde) + 1 },
                (_, i) => i + Number(level.desde)
              )
            )

            const areThereDuplicates = levels.some((level, index) => {
              return levels.slice(index + 1).some((otherLevel) => {
                return level.some((number) => otherLevel.includes(number))
              })
            })

            if (areThereDuplicates) {
              notification.error({
                message: t.common.error,
                description: t.rubrics.levels.errorDuplicate,
              })
              return Promise.reject(new Error(t.rubrics.levels.errorDuplicate))
            }

            const allNumbers = Array.from({ length: 21 }, (_, i) => i)

            const notas = levels.flat()

            const difference = allNumbers.filter(
              (number) => !notas.includes(number)
            )
            if (difference.length > 0) {
              const message = t.rubrics.levels.errorMissing.replace(
                '{notes}',
                difference.join(', ')
              )
              notification.error({
                message: t.common.error,
                description: message,
              })
              return Promise.reject(new Error(message))
            }

            return Promise.resolve()
          },
        },
      ]}
    >
      {(niveles_de_logro, { add, remove }) => (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 overflow-y-auto max-h-full rounded-xl px-3'>
          {niveles_de_logro.map((nivel) => {
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
                        message: t.rubrics.levels.nameError,
                      },
                    ]}
                  >
                    <Input
                      size='large'
                      allowClear
                      placeholder={t.rubrics.levels.namePlaceholder}
                    />
                  </Form.Item>
                  {nivel.name !== 0 && (
                    <FaCircleXmark
                      size={30}
                      onClick={() => remove(nivel.name)}
                      className={`text-rose-300 hover:text-rose-500 hover:scale-110 cursor-pointer transition-all ml-2 mb-6`}
                    />
                  )}
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <h2 className='text-xl font-semibold '>
                    {t.rubrics.levels.criteriaTitle}
                  </h2>
                  <Form.Item
                    hasFeedback
                    name={[nivel.name, 'criterios']}
                    rules={[
                      {
                        required: true,
                        message: t.rubrics.levels.criteriaError,
                      },
                    ]}
                  >
                    <Input.TextArea
                      style={{ resize: 'none' }}
                      size='large'
                      rows={5}
                      allowClear
                      placeholder={t.rubrics.levels.criteriaPlaceholder}
                    />
                  </Form.Item>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <h2 className='text-xl font-semibold '>
                    {t.rubrics.levels.notesTitle}
                  </h2>
                  <div className='flex gap-2 items-center justify-between'>
                    <Form.Item
                      hasFeedback
                      name={[nivel.name, 'desde']}
                      rules={[
                        {
                          required: true,
                          message: t.rubrics.levels.minError,
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
                        placeholder={t.rubrics.levels.minPlaceholder}
                      />
                    </Form.Item>
                    <span className='text-xl font-semibold mb-7'>-</span>
                    <Form.Item
                      hasFeedback
                      name={[nivel.name, 'hasta']}
                      rules={[
                        {
                          required: true,
                          message: t.rubrics.levels.maxError,
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
                        placeholder={t.rubrics.levels.maxPlaceholder}
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
            onClick={() => add()}
            block
          >
            {t.rubrics.levels.addLevel}
          </Button>
        </div>
      )}
    </Form.List>
  )
}

FormCreateNivelesDeLogro.defaultProps = {}

FormCreateNivelesDeLogro.propTypes = {}

export default FormCreateNivelesDeLogro
