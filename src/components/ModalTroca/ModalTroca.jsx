import React, { useContext, useEffect, useRef,useState } from 'react'
import styles from './ModalTroca.module.css';
import { GlobalContext } from '../../Context/GlobalContext';

const ModalTroca = ({pedido}) => {

const [produtos,setProdutos]=useState([])
const { setModalTroca } = useContext(GlobalContext);
const voltar = useRef()

function closeModal(event){
    if(event.currentTarget === voltar.current){
        setModalTroca({
            status:false,
            pedido:{},
        })
    }
}

useState(()=>{
    if(pedido.length > 0){
        setProdutos(pedido[0].produtos)
    }
    
},[])

useState(()=>{
    if(produtos.length ){
        console.log(produtos);
    }
    
},[produtos])

  return (
    <div className={styles.containerModal}>
        <div className={`${styles.modal}  ${styles.fade}`} >
            <div>
                <div className={styles.voltarContainer} onClick={closeModal} ref={voltar}>
                    <p className={styles.voltarBtn}>{'<'}</p>
                    Voltar    
                </div>
            </div>
            <h1 className={styles.tituloModal}>Selecione os produtos que deseje trocar</h1>
            <div className={`${styles.containerLista} animeLeft`}>
                <div className={styles.cabecalhoTable}>
                    <span className={styles.columnName}>imagem</span>
                    <span className={styles.columnName}>codigo</span>
                    <span className={styles.columnName}>tamanho</span>
                    <span className={styles.columnName}>qtde</span>
                    <span className={styles.columnName}>ação</span>        
                </div>
                {produtos&& produtos.length > 0 && produtos.map((produto, index) => (
                    <div className={styles.linhasTable} key={index}>
                        <img src="" alt="" />
                        <span className={`${styles.itemTable}`}>{produto.cod}</span>
                        <span className={`${styles.itemTable}`}>{produto.tamanho}</span>
                        <span className={`${styles.itemTable}`}>{produto.quantidade}</span>
                        <button 
                            className={`${styles.itemTable} ${styles.btnLinha}`}
                        >Solicitar troca 
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ModalTroca
