import React, { useContext, useEffect, useState } from 'react'
import styles from "./AcompanhaPedido.module.css"
import { GlobalContext } from '../../../Context/GlobalContext';
import { NavLink } from 'react-router-dom';

export const AcompanhaPedido = () => {

    const {pedidos, setPedidos} = useContext(GlobalContext);

   useEffect(()=>{
    console.log(pedidos);
    
   },[pedidos])





  return (
    <div className={styles.ContainrePedidos}>
           
        {pedidos.length > 0&& pedidos.map((pedido)=>(
            <div key={pedido.id} className={styles.containerPedido}>
                <div className={styles.itensPedido} >

      

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

                    <button className={styles.btnVerItens} >Ver itens</button>
                    </div>
                 

                
       
            </div>
        ))}
    
    </div>
  )
}
