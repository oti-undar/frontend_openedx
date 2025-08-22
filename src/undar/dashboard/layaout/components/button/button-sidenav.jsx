import React from 'react'
import PropTypes from 'prop-types'
import { FaChevronRight } from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router'

const ButtonSidenav = ({ children, className, path }) => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div
      onClick={() => navigate(path)}
      className={`px-6 py-2 text-sm cursor-pointer flex items-center gap-2 group -translate-x-2 hover:translate-x-0 transition-all hover:font-semibold ${className} ${
        path === location.pathname ? 'font-bold shadow-md rounded-xl' : ''
      }`}
    >
      <FaChevronRight className='opacity-0 group-hover:opacity-100 transition-all text-rose-600' />
      {children}
    </div>
  )
}

ButtonSidenav.defaultProps = {
  className: '',
}

ButtonSidenav.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
}

export default ButtonSidenav
