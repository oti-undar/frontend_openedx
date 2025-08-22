import React from 'react'
import PropTypes from 'prop-types'
import ButtonPrimary from '../buttons/button-primary'
import { FaFileExport } from 'react-icons/fa6'

const TableTitle = ({
  className,
  title,
  children,
  onExport,
  showExportButton,
}) => (
  <div className={`flex flex-col gap-4 ${className}`}>
    <div className='flex items-center justify-between gap-4'>
      <h2 className='text-2xl font-semibold text-gray-700'>{title}</h2>
      {showExportButton && (
        <div>
          <ButtonPrimary size='small' onClick={onExport}>
            <FaFileExport />
            Exportar
          </ButtonPrimary>
        </div>
      )}
    </div>
    <div className='shadow-xl h-full rounded-xl overflow-hidden'>
      {children}
    </div>
  </div>
)

TableTitle.defaultProps = {
  className: '',
  showExportButton: true,
}

TableTitle.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  onExport: PropTypes.func,
  showExportButton: PropTypes.bool,
}

export default TableTitle
