import { Button, Form, Input, InputNumber, Select, Upload } from 'antd'
import React from 'react'
import { beforeUpload, normFile, toUploadFile } from '../../../../utils/upload'
import { FaCircleXmark, FaImage } from 'react-icons/fa6'
import FormCrearRespuestas from './form-crear-respuestas'
import PropTypes from 'prop-types'
import { tiposExamen } from '../../../../lib/globales'

const FormCrearPreguntas = ({
  rubrica,
  archivos,
  setArchivos,
  tipo_examen,
}) => {
  return (
    <Form.List name='preguntas'>
      {(preguntas, { add, remove }) => (
        <div className='flex flex-col gap-4 overflow-y-auto max-h-full rounded-xl px-3'>
          {preguntas.map((pregunta) => {
            const archivo_pregunta = archivos?.preguntas?.find(
              (pregunta_archivo) => pregunta_archivo.name === pregunta.name
            )
            return (
              <div
                className='flex flex-col bg-white rounded-xl p-7 shadow-lg w-full'
                key={pregunta.key}
              >
                <div className='flex gap-2 w-full items-center'>
                  <div className='text-2xl font-semibold mb-6'>
                    {pregunta.name + 1}.
                  </div>
                  <Form.Item
                    hasFeedback
                    name={[pregunta.name, 'title']}
                    className='w-full'
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingrese el título de la pregunta',
                      },
                    ]}
                  >
                    <Input
                      size='large'
                      allowClear
                      placeholder='Ingrese el título de la pregunta'
                    />
                  </Form.Item>
                  {pregunta.name !== 0 && (
                    <FaCircleXmark
                      size={30}
                      onClick={() => remove(pregunta.name)}
                      className={`text-rose-300 hover:text-rose-500 hover:scale-110 cursor-pointer transition-all ml-2 mb-6`}
                    />
                  )}
                </div>
                <div className='flex flex-col'>
                  {rubrica?.indicadores?.length && (
                    <div>
                      <div className='font-semibold text-nowrap'>
                        Indicadores:
                      </div>
                      <Form.Item
                        hasFeedback
                        name={[pregunta.name, 'indicadores']}
                        className='w-full'
                        rules={[
                          {
                            required: true,
                            message:
                              'Por favor ingrese los indicadores de la pregunta',
                          },
                        ]}
                      >
                        <Select
                          mode='multiple'
                          showSearch
                          placeholder='Indicadores'
                          options={(rubrica?.indicadores ?? []).map(
                            (indicador) => ({
                              value: indicador.id,
                              label: indicador.name,
                            })
                          )}
                        />
                      </Form.Item>
                    </div>
                  )}
                  <div className='flex gap-4 items-center mb-6'>
                    <div className='flex flex-col'>
                      <div className='font-semibold text-nowrap'>
                        Puntos equivalentes:
                      </div>
                      <Form.Item
                        className='mb-2'
                        hasFeedback
                        name={[pregunta.name, 'puntos']}
                      >
                        <InputNumber
                          type='number'
                          controls={false}
                          placeholder='1'
                          precision={0}
                          min={1}
                          max={100}
                        />
                      </Form.Item>
                      {tipo_examen !== tiposExamen.Solo &&
                        tipo_examen !== tiposExamen.Alumno && (
                          <>
                            <div className='font-semibold text-nowrap'>
                              Duración (minutos):
                            </div>
                            <Form.Item
                              className='mb-0'
                              hasFeedback
                              name={[pregunta.name, 'duracion']}
                            >
                              <InputNumber
                                type='number'
                                className='w-24'
                                controls={false}
                                placeholder='Indefinido'
                                min={0}
                              />
                            </Form.Item>
                          </>
                        )}
                    </div>

                    <Form.Item
                      name={[pregunta.name, 'archivo']}
                      valuePropName='file'
                      getValueFromEvent={normFile}
                      noStyle
                    >
                      <Upload.Dragger
                        className='w-full h-40 flex flex-col max-w-[315px]'
                        name='files'
                        fileList={
                          archivo_pregunta?.principal
                            ? [toUploadFile(archivo_pregunta?.principal)]
                            : []
                        }
                        beforeUpload={(file) => {
                          setArchivos((prev) => ({
                            ...prev,
                            preguntas: archivo_pregunta
                              ? prev.preguntas.map((pregunta_aux) =>
                                  pregunta_aux.name === pregunta.name
                                    ? {
                                        ...pregunta_aux,
                                        principal: file,
                                      }
                                    : pregunta_aux
                                )
                              : [
                                  ...prev.preguntas,
                                  {
                                    name: pregunta.name,
                                    principal: file,
                                    respuestas: [],
                                  },
                                ],
                          }))
                          return beforeUpload(file)
                        }}
                        onRemove={() =>
                          setArchivos((prev) => ({
                            ...prev,
                            preguntas: prev.preguntas.map((pregunta_aux) =>
                              pregunta_aux.name === pregunta.name
                                ? { ...pregunta_aux, principal: null }
                                : pregunta_aux
                            ),
                          }))
                        }
                        accept='.jpg, .jpeg, .png, .webp, .gif, .mp4, .mkv, .webm, .ogg, .oga, .mp3, .wav, .aac'
                        maxCount={1}
                        listType='picture'
                      >
                        <div className='flex gap-2 justify-center items-center'>
                          <FaImage size={50} className='text-gray-500' />
                          <div className='text-base text-gray-400 font-semibold text-balance leading-5 -mr-4 max-w-52 '>
                            Puede arrastrar la imagen, audio o video aquí
                          </div>
                        </div>
                      </Upload.Dragger>
                    </Form.Item>
                  </div>
                  <FormCrearRespuestas
                    pregunta={pregunta.name}
                    setArchivos={setArchivos}
                    archivo_pregunta={archivo_pregunta}
                    tipo_examen={tipo_examen}
                  />
                </div>
              </div>
            )
          })}

          <Button
            className='font-bold text-slate-500 w-full py-3'
            type='dashed'
            size='large'
            onClick={() =>
              add({
                respuestas:
                  tipo_examen === tiposExamen.Solo ||
                  tipo_examen === tiposExamen.Alumno
                    ? [{ respuesta: 'SI' }, { respuesta: 'NO' }]
                    : [{}, {}, {}, {}],
              })
            }
            block
          >
            + Agregar Pregunta
          </Button>
        </div>
      )}
    </Form.List>
  )
}

FormCrearPreguntas.defaultProps = {}

FormCrearPreguntas.propTypes = {
  rubrica: PropTypes.object,
  archivos: PropTypes.object,
  setArchivos: PropTypes.func.isRequired,
  tipo_examen: PropTypes.string.isRequired,
}

export default FormCrearPreguntas
