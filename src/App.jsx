import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Home from './Home/Home';

function App() {
  const [homeActive, setHomeActive] = useState(true);



  const handleActive = () => {
    setInterval
    setHomeActive(true);


  }

  return (
    <div className="app" onClick={handleActive}>
      {homeActive ? <Home /> : <div>Status: Inactive</div>}
    </div>
  );
}

export default App;
