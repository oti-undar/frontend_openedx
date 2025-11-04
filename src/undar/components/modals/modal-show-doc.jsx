import { Modal, Tooltip } from 'antd'
import React, { cloneElement } from 'react'
import { FaDownload, FaShareNodes } from 'react-icons/fa6'
import { useJSXToPdf } from '../../hooks/use-react-to-pdf'
import { classOkButtonModal } from '../../lib/clases'
import ButtonBase from '../buttons/button-base'
import PropTypes from 'prop-types'

const ModalShowDoc = ({ open, setOpen, title, children }) => {
  const childrenWithProps = cloneElement(children, {
    show_logo_html: true,
  })

  const { download, print, share } = useJSXToPdf({
    jsx: <>{children}</>,
    name: title,
  })
  return (
    <Modal
      centered
      width='fit-content'
      open={open}
      classNames={{ content: 'min-w-fit' }}
      title={
        <div className='flex items-center gap-3'>
          {title}
          <Tooltip title='Descargar PDF'>
            <ButtonBase
              onClick={download}
              color='danger'
              size='md'
              className='!px-3'
            >
              <FaDownload />
            </ButtonBase>
          </Tooltip>
          <Tooltip title='Compartir'>
            <ButtonBase
              onClick={share}
              color='success'
              size='md'
              className='!px-3'
            >
              <FaShareNodes />
            </ButtonBase>
          </Tooltip>
        </div>
      }
      okText={'Imprimir'}
      onOk={print}
      cancelText='Cerrar'
      cancelButtonProps={{ className: 'rounded-xl' }}
      okButtonProps={{
        className: classOkButtonModal,
      }}
      onCancel={() => setOpen(false)}
      maskClosable={false}
      keyboard={false}
      destroyOnHidden
    >
      <div className='border rounded-xl' style={{ width: 595, zoom: 1.5 }}>
        {childrenWithProps}
      </div>
    </Modal>
  )
}

ModalShowDoc.defaultProps = {}

ModalShowDoc.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
}

export default ModalShowDoc
