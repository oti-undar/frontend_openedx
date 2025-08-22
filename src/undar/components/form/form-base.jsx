import { Form } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const FormBase = ({
  form,
  disabled,
  size,
  variant,
  name,
  className,
  initialValues,
  children,
  onSubmit,
}) => {
  return (
    <Form
      disabled={disabled}
      size={size}
      variant={variant}
      form={form}
      name={name}
      clearOnDestroy
      onFinish={values => onSubmit(values)}
      className={className}
      initialValues={initialValues}
    >
      {children}
    </Form>
  )
}

FormBase.defaultProps = {
  disabled: false,
  size: 'middle',
  variant: 'filled',
  className: '',
  onSubmit: () => {},
}

FormBase.propTypes = {
  form: PropTypes.object,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  initialValues: PropTypes.object,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
}

export default FormBase
