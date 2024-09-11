import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Header from './components/Header/Header';
import Pedidos from './components/Pages/Pedidos/Pedidos';
import Trocas from './components/Pages/Trocas/Trocas';
import Chamados from './components/Pages/Chamados/Chamados';
import Relatorios from './components/Pages/Relatorios/Relatorios';
import { GlobalStorage } from './Context/GlobalContext';

function App() {

  return (
    <GlobalStorage>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pedidos/*' element={<Pedidos/>}/>
          <Route path='/trocas' element={<Trocas/>}/>
          <Route path='/chamados' element={<Chamados/>}/>
          <Route path='/relatorios' element={<Relatorios/>}/>
        </Routes>
      </BrowserRouter>
    </GlobalStorage>
  
  )
}

export default App
