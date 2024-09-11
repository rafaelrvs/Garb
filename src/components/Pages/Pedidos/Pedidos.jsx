import React, { useContext } from 'react'
import styles from './Pedidos.module.css'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Empresa from './Empresa/Empresa'
import Cargos from './Cargos/Cargos'
import { GlobalContext } from '../../../Context/GlobalContext'
import Carrinho from './Carrinho/Carrinho'
import FiltroSVG from '../../../images/Filtro.svg'

const Pedidos = () => {
  const {carrinho} = useContext(GlobalContext);
  const totalQuantidade = carrinho.reduce((total, item) => {
    return total + item.quantidade;
  }, 0);
  
  
  return (
    <>
    <section className={styles.container}>

        <h1>Pedidos</h1>
        <div className={styles.header}>
          <div className={styles.containerFiltro}>
            <img src={FiltroSVG} alt="" />
            <p>Filtrar</p>
          </div>
          <div className={styles.buttonsHeader}>
            <NavLink to={'/pedidos/AcompanharPedidos'} className={styles.btnAcompanha} >Meus Pedidos</NavLink>
            <NavLink to={'/pedidos/carrinho'}  className={styles.btnCarrinho}><p>{totalQuantidade}</p>Meu Carrinho </NavLink>
          </div>
          <div className={styles.LinhaStyle}></div>
        </div>
      <div className={styles.conteudoRoute}>
        <Routes>
          <Route path='/' element={<Empresa/>}/>
          <Route path={`/:id`} element={<Cargos/>} /> 
          <Route path={'/carrinho/'} element={<Carrinho/>}/>
        </Routes>
      </div>
      
    </section>
    </>
  )
}

export default Pedidos
