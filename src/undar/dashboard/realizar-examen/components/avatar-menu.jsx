import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Modal, Upload } from 'antd'
import { FaUserCircle, FaChevronDown } from 'react-icons/fa'
import { getUserAuth } from '../../../utils/api-openEdx'
import { API_URL } from '../../../lib/globales'
import useFetchData from '../../../hooks/useFetchData'
import ButtonPrimary from '../../../components/buttons/button-primary'
import { beforeUpload } from '../../../utils/upload'

const AvatarMenu = () => {
  const items = [
    {
      key: '1',
      label: 'Actualizar avatar',
      onClick: () => setOpenModal(true),
    },
  ]

  const [openModal, setOpenModal] = useState(false)
  const [file, setFile] = useState(null)
  const { isloading, fetchData } = useFetchData()
  const userId = getUserAuth().userId

  const onUpload = () => {
    if (!file) return
    const form = new FormData()
    form.append('avatar', file)
    fetchData({
      method: 'POST',
      url: `${API_URL()}/usuario/${userId}/avatar`,
      data: form,
      headers: { 'Content-Type': 'multipart/form-data' },
      msgSuccess: 'Avatar actualizado',
      onSuccess: () => {
        setOpenModal(false)
        setFile(null)
        window.location.reload()
      },
    })
  }

  const { fetchData: fetchAvatar } = useFetchData()
  const [avatarActual, setAvatarActual] = useState(null)
  useEffect(() => {
    fetchAvatar({
      method: 'GET',
      url: `${API_URL()}/usuario/${userId}`,
      onSuccess: (data) => setAvatarActual(data.avatar),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return (
    <div className='relative inline-flex items-center gap-2'>
      <Dropdown menu={{ items }}>
        <button
          type='button'
          className='flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 active:scale-95 transition-all'
        >
          <img
            src={
              `${API_URL()}${avatarActual}` || 'https://picsum.photos/1500/1500'
            }
            alt='Avatar'
            className='w-10 h-10 rounded-full'
          />
          <FaChevronDown className='text-gray-600' />
        </button>
      </Dropdown>

      <Modal
        title='Actualizar avatar'
        centered
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        destroyOnClose
      >
        <div className='flex flex-col gap-4 w-full'>
          <Upload
            className='*:w-full'
            accept='image/*'
            multiple={false}
            maxCount={1}
            beforeUpload={(file) => {
              setFile(file)
              return beforeUpload(file)
            }}
            listType='picture'
          >
            <Button
              icon={'+'}
              className='font-semibold text-xs text-gray-500 w-full'
            >
              Subir archivo
            </Button>
          </Upload>
          <div className='flex items-center justify-end gap-2'>
            <ButtonPrimary
              variant='danger'
              onClick={() => setOpenModal(false)}
              size='small'
            >
              Cancelar
            </ButtonPrimary>
            <ButtonPrimary
              onClick={onUpload}
              disabled={!file || isloading}
              size='small'
            >
              Actualizar
            </ButtonPrimary>
          </div>
        </div>
      </Modal>
    </div>
  )
}

AvatarMenu.defaultProps = {}

AvatarMenu.propTypes = {}

export default AvatarMenu
