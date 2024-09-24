import React, { useContext, useState } from 'react'
import styles from './Trocas.module.css'
import {NavLink} from 'react-router-dom'
import ContainerTrocaDevolucao from './ContainerTrocaDevolucao/ContainerTrocaDevolucao'
import { GlobalContext } from '../../../Context/GlobalContext'
import ModalTroca from '../../ModalTroca/ModalTroca'
const Trocas = () => {
  const { modalTroca } = useContext(GlobalContext);

  const [active, setActive]=useState({
    status: false,
    name:''
  })

  function handleSelect(name){
    if(active.name === name){
      setActive({
        status:false,
        name:'',
      })
    }else{
      setActive({
        status:true,
        name:name,
      })
    }
  }

  return (
    <div className={styles.container}>
    <section className={styles.containerWrapper}>
      <h1 className={styles.tituloPage}>Trocas e Devoluções</h1>
      <div className={styles.LinhaStyle}></div>
      <h3 className={styles.subTitle}>Selecione a ação desejada para prosseguir</h3>
      <div className={styles.wrapperButtons}>
        <NavLink  
          className={()=>{ return active.name ==='troca'? styles.navButtonActive :styles.navButton}} 
          onClick={()=>handleSelect('troca')}
        >Troca</NavLink>
        <NavLink  
          className={()=>{ return active.name ==='devolucao'? styles.navButtonActive :styles.navButton}} 
          onClick={()=>handleSelect('devolucao')}
          >Devolução</NavLink>
      </div>
      {active.status&& <ContainerTrocaDevolucao name={active.name}/>}
    </section>
    </div>
  )
}

export default Trocas
