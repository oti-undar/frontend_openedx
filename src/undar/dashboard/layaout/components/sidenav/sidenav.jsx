import React from 'react'
import ButtonSidenav from '../button/button-sidenav'
import GradientText from '../../../../../TextAnimations/GradientText/GradientText'
import logo from '../../../../home/undar.png'
import { MdLeaderboard, MdSpaceDashboard } from 'react-icons/md'
import { IoDocumentText } from 'react-icons/io5'
import { FaBook } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { FaChartSimple } from 'react-icons/fa6'

const links = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdSpaceDashboard className='text-sky-600/60 text-xl' />,
  },
  {
    title: 'Exámenes',
    path: '/examenes',
    icon: <IoDocumentText className='text-lime-600/60 text-xl' />,
  },
  {
    title: 'Cursos',
    path: '/cursos',
    icon: <FaBook className='text-orange-600/60 text-xl' />,
  },
]

const Sidenav = () => {
  const navigate = useNavigate()
  return (
    <div className='h-full flex flex-col justify-center items-center gap-20 p-8 pr-2 relative animate-fade-right animate-ease-in-out'>
      <div className='absolute top-8 flex flex-col items-center gap-4'>
        <img src={logo} width={100} alt='Logo' />
        <div onClick={() => navigate('/crear-examen')} className='mt-6'>
          <GradientText
            colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
            animationSpeed={6}
            showBorder
            className='px-5 py-1 shadow-md text-sm font-semibold cursor-pointer'
          >
            Crear Examen
          </GradientText>
        </div>
        <ButtonSidenav path='/rubricas' className='text-nowrap'>
          <FaChartSimple className='text-purple-600/60 text-xl' />
          Crear Rúbricas
        </ButtonSidenav>
      </div>
      <div className='flex flex-col gap-2'>
        {links.map(link => (
          <ButtonSidenav key={link.title} path={link.path}>
            {link.icon}
            {link.title}
          </ButtonSidenav>
        ))}
      </div>
    </div>
  )
}

Sidenav.defaultProps = {}

Sidenav.propTypes = {}

export default Sidenav
