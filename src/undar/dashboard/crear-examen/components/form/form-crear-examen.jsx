import { Form, Input, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import FormBase from '../../../../components/form/form-base'
import FormCrearPreguntas from './form-crear-preguntas'
import FormAjustesExamen from './form-ajustes-examen'
import { FaEdit, FaPlusCircle } from 'react-icons/fa'
import ButtonPrimary from '../../../../components/buttons/button-primary'
import useFetchData from '../../../../hooks/useFetchData'
import { API_URL, states, tiposExamen } from '../../../../lib/globales'
import SelectCurso from '../../../../components/selects/select-curso'
import { useGetStates } from '../../../../hooks/use-get-states'
import { appendFormDataRecursively } from '../../../../utils/form-data'
import { useNavigate } from 'react-router-dom'
import { LuLoaderCircle } from 'react-icons/lu'
import FormSeleccionarRubrica from './form-seleccionar-rubrica'
import { getUserAuth } from '../../../../utils/api-openEdx'
import PropTypes from 'prop-types'
import { toUploadFile, urlToFile } from '../../../../utils/upload'

const FormCrearExamen = ({ examen, creacion = false }) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { fetchData, isloading } = useFetchData()
  const { estados } = useGetStates()

  const user_id = getUserAuth().userId

  const [tipoRubrica, setTipoRubrica] = useState(
    examen?.rubrica_analitica_id ? 'analitica' : 'holistica'
  )
  const [rubrica, setRubrica] = useState(
    examen?.rubrica_analitica || examen?.rubrica_holistica
  )

  const [archivos, setArchivos] = useState({
    principal: null,
    preguntas: [],
  })

  useEffect(() => {
    if (archivos?.principal)
      form.setFieldValue('archivo', toUploadFile(archivos?.principal))

    if (archivos?.preguntas?.length)
      archivos?.preguntas?.forEach(pregunta => {
        if (pregunta?.principal) {
          form.setFieldValue(
            ['preguntas', pregunta.name, 'archivo'],
            toUploadFile(pregunta?.principal)
          )
        }

        if (pregunta?.respuestas?.length)
          pregunta?.respuestas?.forEach(respuesta => {
            if (respuesta?.principal) {
              form.setFieldValue(
                [
                  'preguntas',
                  pregunta.name,
                  'respuestas',
                  respuesta.name,
                  'archivo',
                ],
                toUploadFile(respuesta?.principal)
              )
            }
          })
      })
  }, [archivos, form])

  function handleFinish(values) {
    const data = {
      ...values,
      id: undefined,
      preguntas: values.preguntas.map(pregunta => ({
        ...pregunta,
        id: undefined,
        examen_id: undefined,
        respuestas: pregunta?.respuestas?.map(respuesta => ({
          ...respuesta,
          id: undefined,
          pregunta_id: undefined,
        })),
      })),
      rubrica_holistica_id: values.rubrica_holistica_id?.id,
      rubrica_analitica_id: values.rubrica_analitica_id?.id,
      state_id:
        values.tipo_examen === tiposExamen.Solo
          ? estados.find(state => state.name === states.Disponible).id
          : estados.find(state => state.name === states.Activo).id,
      user_id,
    }

    const formData = new FormData()
    appendFormDataRecursively(formData, data)
    console.log('🚀 ~ file: form-crear-examen.jsx:86 ~ data:', data)

    fetchData({
      method: creacion ? 'POST' : 'PUT',
      url: `${API_URL()}/examen${creacion ? '' : `/${examen?.id}`}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      msgSuccess: creacion
        ? 'Examen creado correctamente'
        : 'Examen editado correctamente',
      onSuccess: () => {
        form.resetFields()
        navigate('/examenes')
      },
    })
  }

  useEffect(() => {
    form.resetFields()
    if (examen) {
      if (examen?.img || examen?.video || examen?.audio)
        urlToFile(
          `${API_URL()}/${examen?.img || examen?.video || examen?.audio}`
        ).then(file => {
          setArchivos(prev => ({
            ...prev,
            principal: file,
          }))
        })

      if (examen?.preguntas?.length)
        examen?.preguntas?.forEach((pregunta, name) => {
          if (pregunta?.img || pregunta?.video || pregunta?.audio)
            urlToFile(
              `${API_URL()}/${
                pregunta?.img || pregunta?.video || pregunta?.audio
              }`
            ).then(file => {
              setArchivos(prev => {
                const pregunta_en_aux = prev.preguntas.find(
                  p => p.name === name
                )
                return {
                  ...prev,
                  preguntas: pregunta_en_aux
                    ? prev.preguntas.map(p =>
                        p.name === name ? { ...p, principal: file } : p
                      )
                    : [
                        ...prev.preguntas,
                        { name, principal: file, respuestas: [] },
                      ],
                }
              })
            })

          if (pregunta?.respuestas?.length)
            pregunta?.respuestas?.forEach((respuesta, name_respuesta) => {
              if (respuesta?.img || respuesta?.video || respuesta?.audio)
                urlToFile(
                  `${API_URL()}/${
                    respuesta?.img || respuesta?.video || respuesta?.audio
                  }`
                ).then(file => {
                  setArchivos(prev => {
                    const pregunta_en_aux = prev.preguntas.find(
                      p => p.name === name
                    )
                    const respuesta_en_aux = pregunta_en_aux?.respuestas.find(
                      r => r.name === name_respuesta
                    )
                    return {
                      ...prev,
                      preguntas: pregunta_en_aux
                        ? prev.preguntas.map(p =>
                            p.name === name
                              ? {
                                  ...p,
                                  respuestas: respuesta_en_aux
                                    ? p.respuestas.map(r =>
                                        r.name === name_respuesta
                                          ? { ...r, principal: file }
                                          : r
                                      )
                                    : [
                                        ...p.respuestas,
                                        {
                                          name: name_respuesta,
                                          principal: file,
                                        },
                                      ],
                                }
                              : p
                          )
                        : [
                            ...prev.preguntas,
                            {
                              name,
                              principal: null,
                              respuestas: [
                                { name: name_respuesta, principal: file },
                              ],
                            },
                          ],
                    }
                  })
                })
            })
        })

      form.setFieldsValue({
        ...examen,
        rubrica_analitica_id: examen?.rubrica_analitica,
        rubrica_holistica_id: examen?.rubrica_holistica,
        preguntas: examen?.preguntas?.map(pregunta => ({
          ...pregunta,
          indicadores: pregunta?.indicadores?.map(indicador => indicador.id),
        })),
      })
      setTipoRubrica(examen?.rubrica_analitica_id ? 'analitica' : 'holistica')
      setRubrica(examen?.rubrica_analitica || examen?.rubrica_holistica)
    } else {
      form.setFieldsValue({
        preguntas: [
          {
            respuestas: [{}, {}, {}, {}],
          },
        ],
      })
    }
  }, [examen, form])

  const tipo_examen = Form.useWatch('tipo_examen', form)
  const primera_vez_con_examen = useRef(true)

  useEffect(() => {
    if (!tipo_examen) return
    if (primera_vez_con_examen.current)
      return (primera_vez_con_examen.current = false)

    const preguntas = form.getFieldValue('preguntas')
    form.setFieldsValue({
      preguntas: preguntas?.map(pregunta => {
        return {
          ...pregunta,
          respuestas:
            tipo_examen === tiposExamen.Solo
              ? [
                  {
                    respuesta: 'SI',
                  },
                  {
                    respuesta: 'NO',
                  },
                ]
              : [{}, {}, {}, {}],
        }
      }),
    })
    form.setFieldValue('inicio_examen', undefined)
    form.setFieldValue('final_examen', undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo_examen])

  return (
    <FormBase
      form={form}
      onSubmit={handleFinish}
      className='text-gray-700 flex flex-col'
    >
      <div className='flex justify-between items-center w-full'>
        <div className='flex gap-4 items-center'>
          <h1 className='text-4xl font-bold text-gray-700 h-fit text-nowrap mb-7'>
            {creacion ? 'Crear' : 'Editar'} Examen
          </h1>
          <SelectCurso />
          <Form.Item hasFeedback name='tipo_examen' className='w-full'>
            <Select
              className='min-w-96'
              size='large'
              placeholder='Tipo de Examen (Independiente por defecto)'
              options={Object.values(tiposExamen).map(tipo => ({
                value: tipo,
                label:
                  tipo === tiposExamen.Sync
                    ? 'Junto con los alumnos'
                    : tipo === tiposExamen.Async
                    ? 'Cada alumno independiente'
                    : 'Solo para el docente',
              }))}
            />
          </Form.Item>
        </div>
        <div className='flex gap-4 mb-6'>
          <ButtonPrimary size='large' type='submit' disabled={isloading}>
            {isloading ? (
              <LuLoaderCircle className='animate-spin' />
            ) : creacion ? (
              <FaPlusCircle />
            ) : (
              <FaEdit />
            )}
            {creacion ? 'Crear' : 'Editar'} Examen
          </ButtonPrimary>
        </div>
      </div>
      <div className='grid grid-cols-5 gap-10 size-full'>
        <div className='col-span-3'>
          <div className='flex gap-4 w-full'>
            <h2 className='text-2xl font-semibold text-nowrap'>
              Título del Examen:
            </h2>
            <Form.Item
              hasFeedback
              name='title'
              className='w-full'
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese el título del examen',
                },
              ]}
            >
              <Input
                size='large'
                allowClear
                placeholder='Ingrese el título del examen'
              />
            </Form.Item>
          </div>
          <FormSeleccionarRubrica
            form={form}
            rubrica={rubrica}
            setRubrica={setRubrica}
            setTipoRubrica={setTipoRubrica}
            tipoRubrica={tipoRubrica}
          />
          <div className='flex flex-col gap-2 w-full'>
            <h2 className='text-xl font-semibold '>Descripción del Examen:</h2>
            <Form.Item hasFeedback name='description' className='w-full'>
              <Input.TextArea
                style={{ resize: 'none' }}
                size='large'
                rows={5}
                allowClear
                placeholder='Ingrese la descripción del examen'
              />
            </Form.Item>
          </div>
          <FormAjustesExamen
            form={form}
            examen={examen}
            archivos={archivos}
            setArchivos={setArchivos}
          />
        </div>
        <div className='col-span-2 h-[calc(100dvh-130px)]'>
          <FormCrearPreguntas
            rubrica={rubrica}
            archivos={archivos}
            setArchivos={setArchivos}
            tipo_examen={tipo_examen}
          />
        </div>
      </div>
    </FormBase>
  )
}

FormCrearExamen.defaultProps = {}

FormCrearExamen.propTypes = {
  examen: PropTypes.object,
  creacion: PropTypes.bool,
}

export default FormCrearExamen
