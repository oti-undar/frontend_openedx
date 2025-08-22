import React from 'react'
import { PiStudentFill } from 'react-icons/pi'
import PropTypes from 'prop-types'

const CardResumeDashboard = ({ title, description, icon, className }) => (
  <div
    className={`flex gap-4 items-center bg-gray-50 py-4 px-8 rounded-xl min-w-fit w-full shadow-lg ${className}`}
  >
    {icon}
    <div>
      <h2 className='font-bold text-gray-500'>{title}</h2>
      <p className='text-gray-700 text-3xl font-bold'>{description}</p>
    </div>
  </div>
)

CardResumeDashboard.defaultProps = {
  className: '',
}

CardResumeDashboard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.number,
  icon: PropTypes.node,
  className: PropTypes.string,
}

export default CardResumeDashboard
