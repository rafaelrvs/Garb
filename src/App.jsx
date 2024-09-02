import { useState, useEffect, useCallback } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { GlobalProvider } from './GlobalContext';
import { HeroPage } from './Components/HeroPage/HeroPage';

function App() {
  
  
  return (
    <div>
      <BrowserRouter>
      <GlobalProvider>

      <Routes>
        <Route  path='/' element={<Home/>} />
        <Route  path='HeroPage' element={<HeroPage/>} />
      </Routes>
      </GlobalProvider>

    </BrowserRouter>
    </div>
   
   
  );
}

export default App;
