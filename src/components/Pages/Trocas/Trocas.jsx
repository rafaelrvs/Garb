import React, { useContext, useEffect, useState } from 'react'
import styles from './Trocas.module.css'
import { NavLink } from 'react-router-dom'
import ContainerTrocaDevolucao from './ContainerTrocaDevolucao/ContainerTrocaDevolucao'
import { GlobalContext } from '../../../Context/GlobalContext'

import TrocaEDevolucaoActive from '/images/Header/nav/active/TrocaEDevolucaoActive.svg'


const Trocas = () => {
  const { produtosSelecionados, setModalRelatorio } = useContext(GlobalContext);
  const [trocasDevolucoes, setTrocasDevolucoes] = useState([])
  const [filtro, setFiltro] = useState(''); // Novo estado para o campo de busca
  const [resultadoFiltrado, setResultadoFiltrado] = useState([]); // Estado para armazenar os resultados filtrados

  const [active, setActive] = useState({
    status: false,
    name: ''
  })

  function handleSelect(name) {
    if (active.name === name) {
      setActive({
        status: false,
        name: '',
      })
    } else {
      setActive({
        status: true,
        name: name,
      })
    }
  }

  useEffect(() => {
    const listaTrocasDevolucao = window.localStorage.getItem('trocas')
    if (listaTrocasDevolucao) {
      const trocas = JSON.parse(listaTrocasDevolucao);
      setTrocasDevolucoes(trocas);
      setResultadoFiltrado(trocas); // Inicialmente, mostra todas as trocas
    }
  }, [produtosSelecionados])

  // Função para atualizar o valor do filtro
  function handleFiltroChange(e) {
    setFiltro(e.target.value);
  }

  // Função para realizar a busca pelo ID
  function handleBuscar() {
    if (filtro) {
      const resultados = trocasDevolucoes.filter(troca => troca.id.toString().includes(filtro));
      setResultadoFiltrado(resultados);
    } else {
      setResultadoFiltrado(trocasDevolucoes);
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.containerWrapper}>
        <div className='tituloContainer'>
          <img src={TrocaEDevolucaoActive} alt="logo" className='imgTitulo' />
          <h1 className={'tituloPage'}>Trocas e Devoluções</h1>
        </div>
        <div className={styles.LinhaStyle}></div>
        <h3 className={styles.subTitle}>Selecione a ação desejada para prosseguir</h3>
        <div className={styles.wrapperButtons}>
          <NavLink
            className={() => { return active.name === 'troca' ? styles.navButtonActive : styles.navButton }}
            onClick={() => handleSelect('troca')}
          >Troca</NavLink>
          <NavLink
            className={() => { return active.name === 'devolucao' ? styles.navButtonActiveDev : styles.navButton }}
            onClick={() => handleSelect('devolucao')}
          >Devolução</NavLink>
        </div>
        {active.status && <ContainerTrocaDevolucao name={active.name} />}
        <div>
          <h1 className={styles.tituloRelatorio}>Últimas Solicitações</h1>
          <div className={styles.LinhaStyle}></div>
          <div className={styles.constainerBuscar}>
            <input
              type="text"
              className={styles.inputbusca}
              placeholder='nº solicitação:'
              value={filtro}
              onChange={handleFiltroChange} // Atualiza o valor do filtro
            />
            <button className={styles.buscarBtn} onClick={handleBuscar}>Buscar</button>
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
            {resultadoFiltrado.length > 0 ? resultadoFiltrado.map((troca) => (
              <div className={styles.linhasTable} key={troca.id}>
                <span className={`${styles.itemTable} `}>{troca.id}</span>
                <span className={`${styles.itemTable} `}>{troca.dataCriacao}</span>
                <span className={`${styles.itemTable} ${styles.status} `}>{troca.statusbar}</span>
                <span className={`${styles.itemTable} `}>{troca.tipo}</span>
                <button
                  className={`${styles.itemTable} ${styles.btnLinha}`}
                  onClick={() => setModalRelatorio({ status: true, solicitacao: troca })}
                >Detalhes</button>
              </div>
            )) : <div>
              <h2 className={styles.semSolicitacoes}>Sem Solicitações de trocas e devoluções</h2>
            </div>}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Trocas;
