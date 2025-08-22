import PropTypes from 'prop-types'
import React from 'react'

const ButtonPrimary = ({
  onClick,
  disabled,
  type,
  className,
  children,
  variant,
  size,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type={type}
    className={`
        ${variant === 'success' ? 'bg-lime-500 hover:bg-lime-600' : ''}
        ${variant === 'danger' ? 'bg-red-500 hover:bg-red-600' : ''}
        ${variant === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
        ${size === 'small' ? 'px-4 py-1 text-sm' : ''}
        ${size === 'medium' ? 'px-6 py-2 text-base' : ''}
        ${size === 'large' ? 'px-8 py-2 text-lg' : ''}
        text-white rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
)

ButtonPrimary.defaultProps = {
  variant: 'success',
  type: 'button',
  className: '',
  disabled: false,
  onClick: () => {},
  size: 'medium',
}

ButtonPrimary.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['success', 'danger', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
}

export default ButtonPrimary
