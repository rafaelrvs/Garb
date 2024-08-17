import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Home from './Home/Home';
import HeroPage from './Components/HeroPage/HeroPage';

function App() {
  
  const [animacao, setAnimacao] = useState(false);
  
  const [homeActive, setHomeActive] = useState(true);

const handleClick =()=>{
  setAnimacao(true)
  setTimeout(() => {
    setHomeActive(false)
  }, 500);
  
}

  return (
    <div className="app"  onClick={handleClick}>
      {homeActive ? <Home animacao={animacao} /> :<HeroPage/>}
    </div>
  );
}

export default App;
