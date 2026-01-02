import React from 'react'
import { Outlet } from 'react-router'
import Sidenav from './components/sidenav/sidenav'
import LanguageSwitcher from '../../components/language-switcher/language-switcher'

const Layout = () => {
  return (
    <div className='h-dvh w-dvw flex justify-center items-center'>
      <div className='absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div>
      <Sidenav />
      <div className='flex-1 h-full p-8 pl-4 overflow-y-auto animate-fade animate-delay-[500ms] animate-ease-in-out'>
        <LanguageSwitcher />
        <Outlet />
      </div>
    </div>
  )
}

Layout.defaultProps = {}

Layout.propTypes = {}

export default Layout
