import React, { useContext, useEffect, useState } from 'react'
import styles from './Trocas.module.css'
import {NavLink} from 'react-router-dom'
import ContainerTrocaDevolucao from './ContainerTrocaDevolucao/ContainerTrocaDevolucao'
import { GlobalContext } from '../../../Context/GlobalContext'
const Trocas = () => {
  const { produtosSelecionados,setModalRelatorio } = useContext(GlobalContext);
  const [trocasDevolucoes, setTrocasDevolucoes] = useState([])

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


  useEffect(()=>{
    const listaTrocasDevolucao = window.localStorage.getItem('trocas')
    if(listaTrocasDevolucao){
      setTrocasDevolucoes(JSON.parse(listaTrocasDevolucao))

    }
    
  },[produtosSelecionados])

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
      <div>
        <h1 className={styles.tituloRelatorio}>Ultimas Solicitações</h1>
        <div className={styles.LinhaStyle}></div>
        <div className={styles.constainerBuscar}>
          <input type="text" className={styles.inputbusca} placeholder='nº solicitação:'/>
          <button className={styles.buscarBtn}>Buscar</button>
        </div>
        <h1 className={styles.ResultRelatorio}>Resultado</h1>

        <div className={`${styles.containerLista} animeLeft`}>
          <div className={styles.cabecalhoTable}>
            <span className={styles.columnName}>nº sol. </span>
            <span className={styles.columnName}>emissão</span>
            <span className={styles.columnName}>status sol.</span>
            <span className={styles.columnName}>Tipo</span>
            <span className={styles.columnName}>ação</span>        
          </div>
          <div className={styles.LinhaStyle}></div>
          {trocasDevolucoes.length > 0 ? trocasDevolucoes.map((troca)=>(
            <div className={styles.linhasTable} key={troca.id}>
              <span className={`${styles.itemTable} `}>{troca.id}</span>
              <span className={`${styles.itemTable} `}>{troca.dataCriacao}</span>
              <span className={`${styles.itemTable} ${styles.status} `}>{troca.statusbar}</span>
              <span className={`${styles.itemTable} `}>{troca.tipo}</span>
              <button 
                className={`${styles.itemTable} ${styles.btnLinha}`}
                onClick={()=>setModalRelatorio({status:true, solicitacao:troca})}
              >Detalhes</button>
            </div>
          )):<div>
            <h2 className={styles.semSolicitacoes}>Sem Solicitações de trocas e devoluções</h2>
            </div>}
        </div>
      </div>
    </section>
    </div>
  )
}

export default Trocas
