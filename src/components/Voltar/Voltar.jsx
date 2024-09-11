import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Voltar.module.css'

const Voltar = () => {
    const voltar = useNavigate()
  return (
    <div className={styles.voltarContainer} onClick={()=> voltar(-1)}>
        <p className={styles.voltarBtn}>{'<'}</p>
        
    </div>
  )
}

export default Voltar
