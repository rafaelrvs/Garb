import React, { useState } from 'react'
import styles from "./PedidoMacro.module.css"

const PedidoMacro = () => {
    const [ localizaPedido, setLocalizaPedido] = useState("")
  return (
    <div>
        <h1>Macro</h1>
      <label htmlFor="" className={styles.labelNumped}>
            <p>Nº Pedido</p>
            <input
              type="text"
              className={styles.inputText}
              value={localizaPedido}
              onChange={(e) => setLocalizaPedido(e.target.value)}
            />
          </label>
    </div>
  )
}

export default PedidoMacro
