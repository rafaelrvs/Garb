import React, { useContext, useEffect, useState } from 'react'
import styles from "./AcompanhaPedido.module.css"

import { GlobalContext } from '../../../../Context/GlobalContext';
import Voltar from '../../../Voltar/Voltar';

export const AcompanhaPedido = () => {

    const { pedidos,setValueModal,setModal, setPopUp, popupTimeoutRef } = useContext(GlobalContext);

    function handleActiveModal(e) {
        setValueModal(Number(e.target.value));
        setModal(true);
    }
    
    useEffect(() => {

        setTimeout(()=>{

        const popupData = JSON.parse(localStorage.getItem('mostrarPopUp'));
        console.log(popupData);
        if (popupData && popupData.status) {
            console.log(popupData);
          setPopUp({
            status: popupData.status,
            color: popupData.color,
            children: popupData.message,
          });
      
          // Remova o item do localStorage para evitar mostrar o popup novamente no futuro
          localStorage.removeItem('mostrarPopUp');
      
          // Defina o timeout para ocultar o popup após 3 segundos
          popupTimeoutRef.current = setTimeout(() => {
            setPopUp({
              status: false,
              color: "",
              children: "",
            });
            popupTimeoutRef.current = null;
          }, 5000);
        }
    },2000)

      }, [pedidos]);
      

    return (
        <div className={`${styles.ContainrePedidos} animeLeft`}>
            <Voltar/>
            {pedidos.length > 0 && pedidos.map((pedido) => (
                <div key={pedido.id} className={styles.containerItensDoPedido}>
                    <span>
                        <strong>Nº Pedido</strong>
                        {pedido.id}
                    </span>
                    <span>
                        <strong>Data</strong>
                        {pedido.data}
                    </span>
                    <span>
                        <strong>Status</strong>
                        {pedido.status}
                    </span>
                    <span>
                        <strong>Valor</strong>
                        R${" " + parseFloat(pedido.valorTotal).toFixed(2)}
                    </span>
                    <button className={styles.btnVerItens}  value={pedido.id} onClick={handleActiveModal} >Ver itens</button>
                </div>
            ))}
        </div>
    )
}
