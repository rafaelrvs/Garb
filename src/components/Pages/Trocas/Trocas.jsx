import React, { useState } from 'react'
import styles from './Trocas.module.css'
import {NavLink} from 'react-router-dom'
import ContainerTrocaDevolucao from './ContainerTrocaDevolucao/ContainerTrocaDevolucao'
const Trocas = () => {

  const [active, setActive]=useState(false)
  function handleSelect(){
    setActive(!active)
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.tituloPage}>Trocas e Devoluções</h1>
      <div className={styles.LinhaStyle}></div>
      <h3 className={styles.subTitle}>Selecione a ação desejada para prosseguir</h3>
      <div className={styles.wrapperButtons}>
        <NavLink  className={styles.navButton} onClick={handleSelect}>Troca</NavLink>
        <NavLink  className={styles.navButton}onClick={handleSelect}>Devolução</NavLink>
      </div>
      {active&& <ContainerTrocaDevolucao/>}
      
    </section>
  )
}

export default Trocas
