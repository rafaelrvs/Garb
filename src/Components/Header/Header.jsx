import React from 'react'
import "./Header.css"
import garbLogo from '/src/assets/GarbHero.svg'

const Header = () => {
  return (
   <header className='header-heroPage'>
      <div>
        <img id="main-logoGarb" src={garbLogo} alt="logo" />
      </div>
    
   </header>
  )
}

export default Header
