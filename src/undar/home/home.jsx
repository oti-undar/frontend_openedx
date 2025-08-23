import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SplitText from '../../TextAnimations/SplitText/SplitText';
import GradientText from '../../TextAnimations/GradientText/GradientText';
import BackgroundCubos from './components/background/background-cubos';
import logo from './undar.png';
import { getUserId } from '../utils/api-openEdx';

const Home = () => {
  const navigate = useNavigate();
  getUserId();

  return (
    <div className="h-dvh w-dvw flex flex-col justify-center items-center gap-10">
      <BackgroundCubos />
      <img
        src={logo}
        width={200}
        alt="Logo"
        className="animate-fade-up animate-ease-in-out"
      />
      <SplitText
        text="¡Bienvenido!"
        className="text-8xl font-bold text-center"
        delay={50}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,150px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        easing="easeOutCubic"
        threshold={0.5}
        rootMargin="-150px"
      />
      <p className="text-2xl font-semibold text-center text-p animate-fade-left animate-delay-[1250ms] animate-ease-in-out">
        En este espacio puedes crear exámenes rápidamente para tus alumnos
      </p>
      <div onClick={() => navigate('/crear-examen')}>
        <GradientText
          colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
          animationSpeed={6}
          showBorder
          className="px-6 py-2 shadow-xl text-xl font-semibold cursor-pointer animate-flip-down animate-delay-[1750ms] animate-ease-in-out"
        >
          Comenzar a crear exámenes
        </GradientText>
      </div>
      <div
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 animate-fade animate-delay-[2250ms] animate-ease-in-out cursor-pointer hover:translate-x-2 transition-all text-gray-400 hover:text-gray-500 hover:underline"
      >
        <FaChevronRight />
        <span>Ver lista de exámenes</span>
      </div>
    </div>
  );
};

Home.defaultProps = {};

Home.propTypes = {};

export default Home;
