import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Relatorios.module.css'
import { GlobalContext } from '../../../Context/GlobalContext';
import { BrowserRouter, NavLink, Route, Router, Routes } from 'react-router-dom';
import { PedidoItem } from './PedidoItem/PedidoItem';
import PedidoMacro from './PedidoMacro/PedidoMacro';
import TrackingPedido from './Tracking/TrackingPedido';



const Relatorios = () => {
  const { setModal, pedidos, valueModal } = useContext(GlobalContext);
  const [path,setPath]=useState("")



  return (
    <div className={styles.container}>
      <section className={styles.containerWrapper}>
        <div className={styles.headerRelatorios}>
          <h1>{path ===""?"Relatorios":path}</h1>
        </div>
          
          <main className={styles.containerContent}>

          <div className={styles.relatorios}>
              <NavLink onClick={()=>setPath("Relatorio Macro")}  to={"pedidoItem"} className={styles.itemRelatorio} id="Pedido macro">Pedido macro</NavLink>
              <NavLink onClick={()=>setPath("Relatorio Pedido por item")} to={"pedidoMacro"}  className={styles.itemRelatorio} id="Pedido por item">Pedido por item</NavLink>
              <NavLink onClick={()=>setPath("Relatorio tracking de Pedidos")} to={"tracking"} className={styles.itemRelatorio} id="Tracking de pedidos" >Tracking de pedidos</NavLink>
          </div>
            <div className={styles.containerRelatorio}> 
              <Routes>
                <Route path='/pedidoMacro' element={<PedidoMacro/>}/>
                <Route path='/pedidoItem' element={<PedidoItem/>}/>
                <Route path='/tracking' element={<TrackingPedido/>}/>
            
              </Routes>
            </div>
          

          </main>

      </section>

    </div>
  )
}

export default Relatorios
