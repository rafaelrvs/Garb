import React, { useContext } from 'react'
import styles from './Pedidos.module.css'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Empresa from './Empresa/Empresa'
import Cargos from './Cargos/Cargos'
import { GlobalContext } from '../../../Context/GlobalContext'
import Carrinho from './Carrinho/Carrinho'
import FiltroSVG from '../../../../public/images/Filtro.svg'
import { AcompanhaPedido } from './AcompanhaPedido/AcompanhaPedido'
import InicarPedidoActive from '/images/Header/nav/active/InicarPedidoActive.svg'
import CarrinhoSVG from '/images/carrinho.svg'
import listaPedidosSVG from '/images/listaPedidos.svg'


const Pedidos = () => {
  const {carrinho} = useContext(GlobalContext);
  
  const totalQuantidadeCarrinho = carrinho.reduce((total, item) => {
    return total + item.quantidade;
  }, 0);
  
  
  return (
    <>
    <div className={styles.container}>
      <section className={styles.containerWrapper}>

        <div className='tituloContainer'>
          <img src={InicarPedidoActive} alt="logo" className='imgTitulo' />
          <h1 className={'tituloPage'}>Pedidos</h1>
        </div>
        <div className={styles.header}>
          <div className={styles.containerFiltro}>
            
          </div>
          <div className={styles.buttonsHeader}>
            <NavLink to={'/pedidos/AcompanharPedidos'} className={styles.btnAcompanha} >
            <img src={listaPedidosSVG} alt="" />Meus Pedidos</NavLink>
            <NavLink to={'/pedidos/carrinho'}  className={styles.btnCarrinho}>
              <p>{totalQuantidadeCarrinho}</p>
              <img src={CarrinhoSVG} alt="" />
            Meu Carrinho </NavLink>
          </div>
          <div className={styles.LinhaStyle}></div>
        </div>
        <div className={styles.conteudoRoute}>
          <Routes>
            <Route path='/' element={<Empresa/>}/>
            <Route path={`/:id`} element={<Cargos/>} /> 
            <Route path={'/carrinho/'} element={<Carrinho/>}/>
            <Route path={'/AcompanharPedidos'} element={<AcompanhaPedido/>}/>
          </Routes>
        </div>
      
      </section>
    </div>

    </>
  )
}

export default Pedidos
