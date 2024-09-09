import React, { useContext } from 'react'
import styles from './Pedidos.module.css'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Empresa from './Empresa/Empresa'
import Cargos from './Cargos/Cargos'
import { GlobalContext } from '../../../Context/GlobalContext'


const Pedidos = () => {
  const {carrinho} = useContext(GlobalContext);
  const totalQuantidade = carrinho.reduce((total, item) => {
    return total + item.quantidade;
  }, 0);
  
  
  return (
    <>
    <section className={styles.container}>
      <div className={styles.navPedidos}>
        <h1>Pedidos</h1>
        <div className={styles.header}>
          <p>Filtro</p>
          <div>
            <NavLink to={'/AcompanharPedidos'} className={styles.btnAcompanha} >Acompanhar pedidos</NavLink>
            <NavLink to={'/carrinho'}  className={styles.btnCarrinho}><p>{totalQuantidade}</p>Meu Carrinho </NavLink>
          </div>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Empresa/>}/>
        <Route path={`/:id`} element={<Cargos/>} />
      </Routes>
      
    </section>
    </>
  )
}

export default Pedidos
