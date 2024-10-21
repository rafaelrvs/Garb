import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Relatorios.module.css'
import { GlobalContext } from '../../../Context/GlobalContext';
import { BrowserRouter, NavLink, Route, Router, Routes } from 'react-router-dom';
import { PedidoItem } from './PedidoItem/PedidoItem';
import PedidoMacro from './PedidoMacro/PedidoMacro';
import TrackingPedido from './Tracking/TrackingPedido';

import RelatorioActive from '/images/Header/nav/active/RelatorioActive.svg'



const Relatorios = () => {
  const { setModal, pedidos, valueModal } = useContext(GlobalContext);
  const [path,setPath]=useState("")



  return (
    <div className={styles.container}>
      <section className={styles.containerWrapper}>
        <div className={styles.headerRelatorios}>
        <div className='tituloContainer'>
          <img src={RelatorioActive} alt="logo" className='imgTitulo' />
          <h1 className={'tituloPage'}>Relatórios</h1>
        </div>
        </div>
          
          <main className={styles.containerContent}>

          <div className={styles.relatorios}>
              <NavLink onClick={()=>setPath("Relatorio Macro")}  to={"/relatorios"} className={styles.itemRelatorio} id="Pedido macro">Pedidos Gerais</NavLink>
              <NavLink onClick={()=>setPath("Relatorio Pedido por item")} to={"pedidoMacro"}  className={styles.itemRelatorio} id="Pedido por item">Pedido por item</NavLink>
              <NavLink onClick={()=>setPath("Relatorio tracking de Pedidos")}className={styles.itemRelatorio} id="Tracking de pedidos" >Solicitar Novo modelo</NavLink>
          </div>
            <div className={`${styles.containerRelatorio} animeLeft`}> 
              <Routes>
                <Route path='/' element={<PedidoItem/>}/>
                <Route path='/pedidoMacro' element={<PedidoMacro/>}/>
                <Route path='/tracking' element={<TrackingPedido/>}/>
              </Routes>
            </div>
          

          </main>

      </section>

    </div>
  )
}

export default Relatorios
