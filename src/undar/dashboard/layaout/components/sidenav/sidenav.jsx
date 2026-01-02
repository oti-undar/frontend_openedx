import React from 'react'
import ButtonSidenav from '../button/button-sidenav'
import GradientText from '../../../../../TextAnimations/GradientText/GradientText'
import logo from '../../../../home/undar.png'
import { MdSpaceDashboard } from 'react-icons/md'
import { IoDocumentText } from 'react-icons/io5'
import { FaBook } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { FaChartSimple } from 'react-icons/fa6'
import { useActualizarData } from '../../../../hooks/use-actualizar-data'
import ButtonPrimary from '../../../../components/buttons/button-primary'
import AvatarMenu from '../../../realizar-examen/components/avatar-menu'
import { useLanguage } from '../../../../../context/useLanguaje'

const Sidenav = () => {
  const navigate = useNavigate()
  const { actualizarData, isloading } = useActualizarData()
  const { t } = useLanguage()

  const links = [
    {
      title: t.sidenav.dashboard,
      path: '/dashboard',
      icon: <MdSpaceDashboard className='text-sky-600/60 text-xl' />,
    },
    {
      title: t.sidenav.exams,
      path: '/examenes',
      icon: <IoDocumentText className='text-lime-600/60 text-xl' />,
    },
    {
      title: t.sidenav.courses,
      path: '/cursos',
      icon: <FaBook className='text-orange-600/60 text-xl' />,
    },
  ]

  return (
    <div className='h-full flex flex-col justify-between items-center gap-20 p-8 pr-2 relative animate-fade-right animate-ease-in-out'>
      <div className='absolute top-8 flex flex-col items-center gap-4'>
        <img src={logo} width={100} alt='Logo' />
        <AvatarMenu />
        <div onClick={() => navigate('/crear-examen')} className='mt-6'>
          <GradientText
            colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
            animationSpeed={6}
            showBorder
            className='px-5 py-1 shadow-md text-sm font-semibold cursor-pointer'
          >
            {t.sidenav.createExam}
          </GradientText>
        </div>
        <ButtonSidenav path='/rubricas' className='text-nowrap'>
          <FaChartSimple className='text-purple-600/60 text-xl' />
          {t.sidenav.rubrics}
        </ButtonSidenav>
        <ButtonPrimary
          disabled={isloading}
          size='small'
          onClick={actualizarData}
        >
          {isloading ? t.sidenav.syncing : t.sidenav.sync}
        </ButtonPrimary>
      </div>
      <div className='mt-8'></div>
      <div className='flex flex-col gap-2'>
        {links.map((link) => (
          <ButtonSidenav key={link.title} path={link.path}>
            {link.icon}
            {link.title}
          </ButtonSidenav>
        ))}
      </div>
      <div className='flex flex-col gap-2'>
        <ButtonPrimary
          variant='danger'
          size='small'
          onClick={() => (window.location.href = '/')}
        >
          {t.sidenav.backToEdx}
        </ButtonPrimary>
      </div>
    </div>
  )
}

Sidenav.defaultProps = {}

Sidenav.propTypes = {}

export default Sidenav
