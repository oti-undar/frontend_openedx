import React from 'react'
import { LuLoaderCircle } from 'react-icons/lu'

const Loader = () => {
  return (
    <div className='h-dvh w-dvw flex justify-center items-center'>
      <LuLoaderCircle className='animate-spin text-rose-700' size={50} />
    </div>
  )
}

Loader.defaultProps = {}

Loader.propTypes = {}

export default Loader
