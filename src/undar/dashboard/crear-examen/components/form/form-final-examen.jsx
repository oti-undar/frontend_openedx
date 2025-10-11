import { DatePicker, Form, InputNumber, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FaClock } from 'react-icons/fa'
import { formatDayjsToUTC, presetsDatePicker } from '../../../../utils/date'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

const FormFinalExamen = ({ form, inicio_examen, examen }) => {
  const [modoFinal, setModoFinal] = useState(
    examen?.final_examen ? 'fecha' : 'manual'
  )
  const [modoTiempo, setModoTiempo] = useState('h')
  const [tiempo, setTiempo] = useState(null)
  const [fecha, setFecha] = useState(
    examen?.final_examen
      ? dayjs(examen.final_examen).local().format('YYYY-MM-DD HH:mm:ss')
      : null
  )

  const primerResetConExamen = useRef(true)
  useEffect(() => {
    if (examen?.final_examen) {
      setModoFinal('fecha')
      setFecha(dayjs(examen.final_examen).local().format('YYYY-MM-DD HH:mm:ss'))
    }
  }, [examen])

  useEffect(() => {
    if (primerResetConExamen.current && examen?.final_examen)
      primerResetConExamen.current = false
    else resetValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modoFinal])

  useEffect(() => {
    if (tiempo)
      setFecha(
        tiempo && inicio_examen
          ? formatDayjsToUTC(dayjs(inicio_examen).add(tiempo, modoTiempo))
          : null
      )
  }, [modoTiempo, tiempo, inicio_examen])

  useEffect(() => {
    form.setFieldValue('final_examen', fecha)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fecha])

  function resetValues() {
    setModoTiempo('h')
    setTiempo(null)
    setFecha(null)
  }

  return (
    <div>
      <h2 className='text-xl font-semibold pb-2'>Final de Examen</h2>

      <div className='flex gap-2 items-center'>
        <Select
          className='w-1/2'
          placeholder='Modo de Final'
          value={modoFinal}
          prefix={<FaClock className='text-lime-500 mr-1' />}
          onChange={setModoFinal}
          options={[
            {
              value: 'manual',
              label: 'Final Manual',
            },
            {
              value: 'tiempo',
              label: 'Después de X tiempo',
            },
            {
              value: 'fecha',
              label: 'En X fecha y hora',
            },
          ]}
        />

        {modoFinal === 'tiempo' && (
          <div className='animate-fade-right animate-ease-in-out animate-duration-500 flex gap-2 items-center relative'>
            <InputNumber
              className='w-16'
              type='number'
              controls={false}
              placeholder='0'
              value={tiempo}
              onChange={setTiempo}
            />
            <Select
              className='w-32'
              placeholder='Minutos'
              value={modoTiempo}
              onChange={setModoTiempo}
              options={[
                {
                  value: 'm',
                  label: 'Minutos',
                },
                {
                  value: 'h',
                  label: 'Horas',
                },
                {
                  value: 'd',
                  label: 'Días',
                },
              ]}
            />
            {!inicio_examen && (
              <div className='absolute right-2 -top-5 text-xs text-rose-500 animate-flip-up animate-duration-500 animate-ease-in-out text-nowrap'>
                Debe seleccionar una fecha de inicio
              </div>
            )}
            {fecha && (
              <div className='absolute right-2 -top-5 text-xs text-gray-500 animate-flip-up animate-duration-500 animate-ease-in-out'>
                {dayjs(fecha).local().format('DD/MM/YYYY h:mm A')}
              </div>
            )}
          </div>
        )}

        {modoFinal === 'fecha' && (
          <DatePicker
            showTime={{ format: 'h:mm A' }}
            format='DD/MM/YYYY h:mm A'
            presets={presetsDatePicker}
            className='animate-fade-right animate-ease-in-out animate-duration-500'
            placeholder='Fecha de Final'
            value={fecha ? dayjs(fecha).local() : null}
            onChange={value => {
              setFecha(formatDayjsToUTC(value))
            }}
          />
        )}

        <Form.Item name='final_examen' hidden />
      </div>
    </div>
  )
}

FormFinalExamen.defaultProps = {}

FormFinalExamen.propTypes = {
  form: PropTypes.object.isRequired,
  inicio_examen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  examen: PropTypes.object,
}

export default FormFinalExamen
