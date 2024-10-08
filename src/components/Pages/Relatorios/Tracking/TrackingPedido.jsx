import React from 'react'
import styles from"./Tracking.module.css"
const TrackingPedido = () => {
  return (
    <div className={styles.containerContent}>
      <input type="button" value="Monte seu Relatorio" />
      <input type="button" value="Relatorios recentes" />
      <input type="button" value="Pedidos recentes" />
      <input type="button" value="Media Pedidos" />
    </div>
  )
}

export default TrackingPedido
