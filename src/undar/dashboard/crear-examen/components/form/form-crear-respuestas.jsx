import { Button, Form, Input, Upload } from 'antd'
import React from 'react'
import { FaCircleXmark } from 'react-icons/fa6'
import PropTypes from 'prop-types'
import { beforeUpload, normFile, toUploadFile } from '../../../../utils/upload'
import { tiposExamen } from '../../../../lib/globales'

const FormCrearRespuestas = ({
  pregunta,
  setArchivos,
  archivo_pregunta,
  tipo_examen,
}) => {
  return (
    <Form.List name={[pregunta, 'respuestas']}>
      {(respuestas, { add, remove }) => (
        <div className='flex flex-col'>
          {respuestas.map(respuesta => {
            const archivo_respuesta = archivo_pregunta?.respuestas?.find(
              respuesta_archivo => respuesta_archivo.name === respuesta.name
            )
            return (
              <div
                className={`flex gap-2 items-center justify-center ${
                  respuesta.name === 0 ? 'text-lime-500' : ''
                }`}
                key={respuesta.key}
              >
                <div className='font-semibold mb-6'>{respuesta.name + 1}.</div>
                <Form.Item
                  hasFeedback
                  name={[respuesta.name, 'respuesta']}
                  className='w-full'
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingrese la alternativa',
                    },
                  ]}
                >
                  <Input
                    className={`${
                      respuesta.name === 0 ? 'shadow-lg shadow-lime-500/30' : ''
                    }`}
                    allowClear
                    placeholder={
                      respuesta.name === 0
                        ? 'Respuesta correcta'
                        : `Ingrese una alternativa`
                    }
                    readOnly={tipo_examen === tiposExamen.Solo}
                    variant={
                      tipo_examen === tiposExamen.Solo
                        ? 'borderless'
                        : undefined
                    }
                  />
                </Form.Item>
                <style>
                  {`
                  .upload-xs .ant-upload-list-item-name {
                    font-size: 10px;
                  }
                  .upload-xs .ant-upload-list-item-container {
                    margin-top: -8px;
                  }
                `}
                </style>
                {tipo_examen !== tiposExamen.Solo && (
                  <Form.Item
                    name={[respuesta.name, 'archivo']}
                    valuePropName='file'
                    getValueFromEvent={normFile}
                    noStyle
                  >
                    <Upload
                      className='mb-6 upload-xs max-w-[115px]'
                      name='files'
                      fileList={
                        archivo_respuesta?.principal
                          ? [toUploadFile(archivo_respuesta?.principal)]
                          : []
                      }
                      beforeUpload={file => {
                        setArchivos(prev => ({
                          ...prev,
                          preguntas: archivo_pregunta
                            ? prev.preguntas.map(pregunta_aux =>
                                pregunta_aux.name === pregunta
                                  ? {
                                      ...pregunta_aux,
                                      respuestas: archivo_respuesta
                                        ? pregunta_aux?.respuestas?.map(
                                            respuesta_aux =>
                                              respuesta_aux.name ===
                                              respuesta.name
                                                ? {
                                                    ...respuesta_aux,
                                                    principal: file,
                                                  }
                                                : respuesta_aux
                                          )
                                        : [
                                            ...(pregunta_aux?.respuestas ?? []),
                                            {
                                              name: respuesta.name,
                                              principal: file,
                                            },
                                          ],
                                    }
                                  : pregunta_aux
                              )
                            : [
                                ...prev.preguntas,
                                {
                                  name: pregunta,
                                  principal: null,
                                  respuestas: [
                                    {
                                      name: respuesta.name,
                                      principal: file,
                                    },
                                  ],
                                },
                              ],
                        }))
                        return beforeUpload(file)
                      }}
                      accept='.jpg, .jpeg, .png, .webp, .gif, .mp4, .mkv, .webm, .ogg, .oga, .mp3, .wav, .aac'
                      maxCount={1}
                      onRemove={() =>
                        setArchivos(prev => ({
                          ...prev,
                          preguntas: prev.preguntas.map(pregunta_aux =>
                            pregunta_aux.name === pregunta
                              ? {
                                  ...pregunta_aux,
                                  respuestas: pregunta_aux?.respuestas?.map(
                                    respuesta_aux =>
                                      respuesta_aux.name === respuesta.name
                                        ? { ...respuesta_aux, principal: null }
                                        : respuesta_aux
                                  ),
                                }
                              : pregunta_aux
                          ),
                        }))
                      }
                      listType='picture'
                    >
                      <Button
                        icon={'+'}
                        className='font-semibold text-xs text-gray-500'
                      >
                        Subir archivo
                      </Button>
                    </Upload>
                  </Form.Item>
                )}
                {respuesta.name > 3 && (
                  <FaCircleXmark
                    size={20}
                    onClick={() => remove(respuesta.name)}
                    className={`text-rose-300 hover:text-rose-500 hover:scale-110 cursor-pointer transition-all mb-6`}
                  />
                )}
              </div>
            )
          })}

          {tipo_examen !== tiposExamen.Solo && (
            <Button
              className='font-bold text-slate-500 w-full'
              type='dashed'
              size='large'
              onClick={() => add()}
              block
            >
              + Agregar Alternativa
            </Button>
          )}
        </div>
      )}
    </Form.List>
  )
}

FormCrearRespuestas.defaultProps = {}

FormCrearRespuestas.propTypes = {
  pregunta: PropTypes.number.isRequired,
  setArchivos: PropTypes.func.isRequired,
  archivo_pregunta: PropTypes.object.isRequired,
  tipo_examen: PropTypes.string.isRequired,
}

export default FormCrearRespuestas
