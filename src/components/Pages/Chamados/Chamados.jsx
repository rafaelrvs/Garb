import React, { useContext, useEffect, useState } from 'react'
import styles from './Chamados.module.css'
import ModalChamado from '../../ModalChamado/ModalChamado.jsx'
import { GlobalContext } from '../../../Context/GlobalContext.jsx';
const Chamados = () => {
  const {modalChamado,setModalChamado } = useContext(GlobalContext);

  const [chamados, setChamados ] = useState()
  const [resultadoFiltrado, setResultadoFiltrado] = useState([]); // Estado para armazenar os resultados filtrados
  const [filtro, setFiltro] = useState(''); // Novo estado para o campo de busca


  function openModal(){
    setModalChamado({
    status: true,
    data: {}
  })

  }

  useEffect(() => {
    const listaChamados = window.localStorage.getItem('chamados')
    if (listaChamados) {
      const chamado = JSON.parse(listaChamados);
      setChamados(chamado)
      setResultadoFiltrado(chamado);
    }
  }, [chamados])


  function handleBuscar() {
    if (filtro) {
      const resultados = chamados.filter(troca => troca.id.toString().includes(filtro));
      setResultadoFiltrado(resultados);
    } else {
      setResultadoFiltrado(chamados);
    }
  }

  function handleFiltroChange(e) {
    setFiltro(e.target.value);
  }
  
  return (
    <div className={styles.container}>
      <section className={styles.containerWrapper}>
        <h1 className={styles.tituloPage}>Suporte</h1>
        <div className={styles.LinhaStyle}></div>
        <h3 className={styles.subTitle}>Precisa de ajuda? abra um chamado e o acompanhe aqui</h3>
        <div className={styles.wrapperButtons}>
          <button 
            className={styles.navButton}
            onClick={openModal}
            >+ Abrir Chamado</button>
        </div>

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
            <button 
              className={styles.buscarBtn}
              onClick={handleBuscar}
              >Buscar</button>
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
                <span className={`${styles.itemTable} `}>{troca.destinado}</span> 
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
      {modalChamado.status && <ModalChamado/> }
      


    </div>
  )
}

export default Chamados
