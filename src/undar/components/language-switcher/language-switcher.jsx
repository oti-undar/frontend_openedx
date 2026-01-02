import React from 'react'
import { useLanguage } from '../../../context/useLanguaje'

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className='
        fixed top-5 right-5 z-50
        flex items-center justify-center
        w-8 h-8 rounded-full
        bg-lime-500/50 backdrop-blur-sm
        shadow-lg border
        hover:scale-110 active:scale-95
        transition-all duration-300 ease-in-out
        font-bold
        cursor-pointer pb-1
      '
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {language === 'es' ? '🇪🇸' : '🇺🇸'}
    </button>
  )
}

export default LanguageSwitcher
