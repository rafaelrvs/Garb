import React, { useContext, useState } from 'react'
import styles from './ContainerTrocaDevolucao.module.css'
import { GlobalContext } from '../../../../Context/GlobalContext';
const ContainerTrocaDevolucao = ({name}) => {

  const { pedidos,setModalTroca } = useContext(GlobalContext);

  function handleOpenModal(currentPedido){
    const pedido = pedidos.filter((pedido)=>{
      return pedido.id === currentPedido
    })
    setModalTroca({
      status:true,
      pedido:pedido,
    })
  }
  return (
    <div className={`${styles.containerLista} animeLeft`}>
      <div className={styles.cabecalhoTable}>
        <span className={styles.columnName}>pedido</span>
        <span className={styles.columnName}>emissão</span>
        <span className={styles.columnName}>status</span>
        <span className={styles.columnName}>qtde</span>
        <span className={styles.columnName}>ação</span>        
      </div>

      {pedidos.length > 0 && name ==='troca'&& pedidos.map((pedido)=>(
        <div className={styles.linhasTable} key={pedido.id}>
          <span className={`${styles.itemTable} `}>{pedido.id}</span>
          <span className={`${styles.itemTable} `}>{pedido.data}</span>
          <span className={`${styles.itemTable} `}>{pedido.status}</span>
          <span className={`${styles.itemTable} `}>{pedido.qtdeTotal}</span>
          <button 
            className={`${styles.itemTable} ${styles.btnLinha}`}
            onClick={()=>handleOpenModal(pedido.id)}
          >Solicitar troca </button>
        </div>
      ))}
    </div>
  )
}

export default ContainerTrocaDevolucao
