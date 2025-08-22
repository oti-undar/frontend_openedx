import { Button, Form, Input, Upload } from 'antd'
import React from 'react'
import { FaCircleXmark } from 'react-icons/fa6'
import PropTypes from 'prop-types'
import { beforeUpload, normFile } from '../../../../utils/upload'

const FormCrearRespuestas = ({ pregunta, form }) => (
  <Form.List name={[pregunta, 'respuestas']}>
    {(respuestas, { add, remove }) => (
      <div className='flex flex-col'>
        {respuestas.map(respuesta => {
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
              <Form.Item
                name={[respuesta.name, 'archivo']}
                valuePropName='file'
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload
                  className='mb-6 upload-xs'
                  name='files'
                  beforeUpload={beforeUpload}
                  accept='.jpg, .jpeg, .png, .webp, .gif, .mp4, .mkv, .webm, .ogg, .oga, .mp3, .wav, .aac'
                  maxCount={1}
                  onChange={({ fileList }) => {
                    form.setFieldValue(
                      [
                        'preguntas',
                        pregunta,
                        'respuestas',
                        respuesta.name,
                        'archivo',
                      ],
                      fileList[0]
                    )
                  }}
                >
                  <Button
                    icon={'+'}
                    className='font-semibold text-xs text-gray-500'
                  >
                    Subir archivo
                  </Button>
                </Upload>
              </Form.Item>
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

        <Button
          className='font-bold text-slate-500 w-full'
          type='dashed'
          size='large'
          onClick={() => add()}
          block
        >
          + Agregar Alternativa
        </Button>
      </div>
    )}
  </Form.List>
)

FormCrearRespuestas.defaultProps = {}

FormCrearRespuestas.propTypes = {
  pregunta: PropTypes.number.isRequired,
  form: PropTypes.object.isRequired,
}

export default FormCrearRespuestas
