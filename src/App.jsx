import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Home from './Home/Home';
import HeroPage from './Components/HeroPage/HeroPage';

function App() {
  
  const [animacao, setAnimacao] = useState(false);
  
  const [homeActive, setHomeActive] = useState(true);


  const handleActive = () => {
    setTimeout(() => {
      setAnimacao(true)
      setHomeActive(true);
      
    }, "500");
    setAnimacao(false)
    
    
    setHomeActive(true);
  }

  return (
    <div className="app"  onClick={handleActive}>
      {homeActive ? <Home animacao={animacao} /> :<HeroPage/>}
    </div>
  );
}

export default App;
