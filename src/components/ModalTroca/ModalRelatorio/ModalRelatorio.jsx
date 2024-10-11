import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './ModalRelatorio.module.css'
import { GlobalContext } from '../../../Context/GlobalContext';
const ModalRelatorio = () => {

const {modalRelatorio,setModalRelatorio} = useContext(GlobalContext);
const voltar = useRef()
const [produtos, setProdutos]=useState()


function closeModal(event){
    if(event.currentTarget === voltar.current){
        setModalRelatorio({
            status:false,
            solicitacao:{},
        })
    }
}


useEffect(()=>{
    if(modalRelatorio.status){
        setProdutos(modalRelatorio.solicitacao.produtos)
    }
    
},[modalRelatorio])

console.log(produtos);

if(produtos)
  return (
    <div className={styles.containerModal}>
        <div className={`${styles.modal}  ${styles.fade}`}>
            <div className={styles.voltarContainer} onClick={closeModal} ref={voltar}>
                <p className={styles.voltarBtn}>{'<'}</p>
                Voltar    
            </div>

            <div className={`${styles.containerLista} animeLeft`}>
                <div className={styles.cabecalhoTable}>
                    <span className={styles.columnName}>imagem</span>
                    <span className={styles.columnName}>codigo</span>
                    <span className={styles.columnName}>tamanho</span>
                    <span className={styles.columnName}>qtde</span>    
                </div>
                {produtos&& produtos.length > 0 && produtos.map((produto, index) => (
                    <div className={styles.linhasTable} key={index}>
                        <div className={styles.containerImg}>
                            <img 
                                src={`/images/produtos/${produto.img}`} 
                                alt={produto.cod} 
                                className={styles.img}
                          />
                        </div>
                        <span className={`${styles.itemTable}`}>{produto.codigo}</span>
                        <span className={`${styles.itemTable}`}>{produto.tamanhoAntigo || produto.tamanhoDevolvido}</span>
                        <span className={`${styles.itemTable}`}>{produto.quantidade}</span>                        
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ModalRelatorio
