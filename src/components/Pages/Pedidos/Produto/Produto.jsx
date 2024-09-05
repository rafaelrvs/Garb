import React from 'react'
import styles from './Produto.module.css'
const Produto = ({cargoID}) => {
    
  return (
    <div className={styles.containerProduto}>
      {cargoID}
    </div>
  )
}

export default Produto
