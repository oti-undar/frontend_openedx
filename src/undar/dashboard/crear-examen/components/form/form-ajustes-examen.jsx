import React, { useState } from 'react'
import { beforeUpload, normFile } from '../../../../utils/upload'
import { Form, InputNumber, Upload } from 'antd'
import { FaImage } from 'react-icons/fa6'
import FormInicioExamen from './form-inicio-examen'
import PropTypes from 'prop-types'
import FormFinalExamen from './form-final-examen'

const FormAjustesExamen = ({ form }) => {
  const [fechaInicio, setFechaInicio] = useState(null)
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='col-span-1 flex flex-col gap-4'>
        <div className='flex gap-2 items-center'>
          <div className='font-semibold text-nowrap text-2xl'>
            Peso del Examen:
          </div>
          <Form.Item className='mb-0' hasFeedback name='peso'>
            <InputNumber
              className='w-full'
              type='number'
              precision={0}
              controls={false}
              placeholder='1 por Defecto'
              min={1}
              max={100}
            />
          </Form.Item>
        </div>
        <FormInicioExamen form={form} onChangeFecha={setFechaInicio} />
        <FormFinalExamen form={form} fecha_inicio={fechaInicio} />
      </div>
      <div className='col-span-1'>
        <Form.Item
          className='w-full'
          name='archivo'
          valuePropName='file'
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger
            className='w-full h-[calc(100dvh-500px)] flex flex-col'
            name='files'
            beforeUpload={beforeUpload}
            accept='.jpg, .jpeg, .png, .webp, .gif, .mp4, .mkv, .webm, .ogg, .oga, .mp3, .wav, .aac'
            maxCount={1}
            onChange={({ fileList }) => {
              form.setFieldValue('archivo', fileList[0])
            }}
          >
            <div className='flex flex-col gap-2 justify-center items-center'>
              <FaImage size={80} className='text-gray-500' />
              <div className='flex flex-col text-slate-400 font-semibold text-lg'>
                <div className='-mb-2'>Subir</div>
                <div>Imagen / Audio / Video</div>
              </div>
            </div>
            <div className='text-gray-400'>
              Puede arrastrar la imagen, audio o video aquí
            </div>
          </Upload.Dragger>
        </Form.Item>
      </div>
    </div>
  )
}

FormAjustesExamen.defaultProps = {}

FormAjustesExamen.propTypes = {
  form: PropTypes.object.isRequired,
}

export default FormAjustesExamen
