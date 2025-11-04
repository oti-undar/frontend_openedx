import React from 'react'
import PropTypes from 'prop-types'

const ButtonBase = ({
  children,
  color = 'default',
  size = 'md',
  className,
  type = 'button',
  ...props
}) => {
  let colorClass = ''
  if (color === 'default') colorClass = 'bg-white shadow !text-slate-800 border'
  if (color === 'success') colorClass = 'bg-emerald-600'
  if (color === 'warning') colorClass = 'bg-amber-600'
  if (color === 'danger') colorClass = 'bg-rose-700'
  if (color === 'info') colorClass = 'bg-cyan-600'

  let sizeClass = ''
  if (size === 'xl') sizeClass = 'px-12 py-2 text-xl rounded-3xl shadow-xl'
  if (size === 'lg') sizeClass = 'px-10 py-2 text-lg rounded-2xl shadow-lg'
  if (size === 'md') sizeClass = 'px-8 py-1 text-base rounded-xl shadow-md'
  if (size === 'sm') sizeClass = 'px-5 py-1 text-sm rounded-lg shadow-sm'
  return (
    <button
      type={type}
      className={`group/btn focus:shadow-sky-500 text-white relative bg bg font-bold transition-all hover:contrast-125 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${colorClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

ButtonBase.defaultProps = {
  color: 'default',
  size: 'md',
  borderBottomGradient: false,
  type: 'button',
}

ButtonBase.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['default', 'success', 'warning', 'danger', 'info']),
  size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm']),
  type: PropTypes.string,
}

export default ButtonBase
