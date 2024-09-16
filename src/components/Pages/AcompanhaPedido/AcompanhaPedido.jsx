import React, { useContext, useEffect, useState } from 'react'
import styles from "./AcompanhaPedido.module.css"
import { GlobalContext } from '../../../Context/GlobalContext';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../Modal/Modal';

export const AcompanhaPedido = () => {

    const {pedidos, setPedidos} = useContext(GlobalContext);
    const {setModal} = useContext(GlobalContext)
    const {setValueModal} = useContext(GlobalContext)



function handleActiveModal(e) {
  
        setValueModal(Number(e.target.value));
        

   setModal(true);   
}


  return (
    <div className={styles.ContainrePedidos}>
   
          
        {pedidos.length > 0 && pedidos.map((pedido)=>(
            <div key={pedido.id} className={styles.containerPedido}>
                <div className={styles.itensPedidoHeader} >

                    <div>
                       <span>
                        Nº Pedido
                        </span> 
                    {pedido.id}    
                    </div>
                    <div>
                       <span>
                        Data
                       </span>
                        {pedido.data}
                    </div>
                    <div>
                        <span>

                        Status
                        </span>
                        {pedido.status}
                    </div>
                        <div>
                    <span>

                        Valor
                    </span>
                    R${ " " + parseFloat(pedido.valorTotal).toFixed(2)}
                        </div>

                    <button className={styles.btnVerItens} value={pedido.id} onClick={handleActiveModal} >Ver itens</button>
                    </div>
                 

                
       
            </div>
        ))}
    
    </div>
  )
}
