import React, { useContext, useEffect, useRef,useState } from 'react'
import styles from './ModalTroca.module.css';
import { GlobalContext } from '../../Context/GlobalContext';
import ProdutoTroca from './ProdutoTroca/ProdutoTroca';

const ModalTroca = ({pedido}) => {

const [produtos,setProdutos]=useState([])
const {modalTroca, setModalTroca, produtoSelecionado, setPopUp, popupTimeoutRef, setProdutoSelecionado, produtosSelecionados,setProdutosSelecionados } = useContext(GlobalContext);

const voltar = useRef()

function closeModal(event){
    if(event.currentTarget === voltar.current){
        setModalTroca({
            status:false,
            pedido:{},
        })
        setProdutoSelecionado({status:false,data:null})
        setProdutosSelecionados([])
    }
}

const generateOrderId = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

function finalizaSolicitacaoTroca(){

    const solicitacao = {
        id: generateOrderId(),
        pedido: modalTroca.pedido[0].id,
        dataCriacao: new Date().toLocaleDateString(),
        statusbar: 'Aguardando analise',
        produtos: produtosSelecionados,
        tipo: modalTroca.tipo === 'troca'? 'Troca':'devolução'
    }
    const solicitacoesExistentes = JSON.parse(localStorage.getItem('trocas')) || [];
    
    const solicitacoesAtualizados = [...solicitacoesExistentes, solicitacao];
    localStorage.setItem('trocas', JSON.stringify(solicitacoesAtualizados));

    setPopUp({
        status: true,
        color: "#46bba2",
        children: "Solicitação de troca criada",
      });
      
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
      
      popupTimeoutRef.current = setTimeout(() => {
        setPopUp({
          status: false,
          color: "",
          children: "",
        });
        popupTimeoutRef.current = null;
      }, 2500);
      
      setProdutoSelecionado({status:false,data:null})
      setProdutosSelecionados([])
      setModalTroca({
        status:false,
        pedido:{},
    })
}

useState(()=>{
    if(pedido.length > 0){
        setProdutos(pedido[0].produtos)
    } 
},[])

  return (
    <div className={styles.containerModal}>
        <div className={`${styles.modal}  ${styles.fade}`} >
            <div>
                <div className={styles.voltarContainer} onClick={closeModal} ref={voltar}>
                    <p className={styles.voltarBtn}>{'<'}</p>
                    Voltar    
                </div>
            </div>
            {modalTroca.tipo ==='troca' ? <h1 className={styles.tituloModal}>Selecione os produtos que deseje trocar</h1>
            :<h1 className={styles.tituloModal}>Selecione os produtos que deseje devolver</h1>}
            <div className={`${styles.containerLista} animeLeft`}>
                <div className={styles.cabecalhoTable}>
                    <span className={styles.columnName}>imagem</span>
                    <span className={styles.columnName}>codigo</span>
                    <span className={styles.columnName}>tamanho</span>
                    <span className={styles.columnName}>qtde</span>
                    <span className={styles.columnName}>ação</span>        
                </div>
                {produtos&& !produtoSelecionado.status&& produtos.length > 0 && produtos.map((produto, index) => (
                    <div className={styles.linhasTable} key={index}>
                        <div className={styles.containerImg}>
                            <img 
                                src={`/images/produtos/${produto.img}`} 
                                alt={produto.cod} 
                                className={styles.img}
                          />
                        </div>
                        <span className={`${styles.itemTable}`}>{produto.cod}</span>
                        <span className={`${styles.itemTable}`}>{produto.tamanho}</span>
                        <span className={`${styles.itemTable}`}>{produto.quantidade}</span>
                        {produtosSelecionados.find((prodSelecionado)=>{                            
                           return produto.cod ===  prodSelecionado.codigo
                        })
                        ?<button 
                            className={`${styles.itemTable} ${styles.btnLinhaSelecionado}`}
                        >Produto Selecionado </button>
                    :
                    <button 
                        className={`${styles.itemTable} ${styles.btnLinha}`}
                        onClick={()=>setProdutoSelecionado({status:true, data: produto})}
                    >Selecionar Produto </button>}
                        
                    </div>
                ))}
                {produtoSelecionado.status && <ProdutoTroca tipo={modalTroca.tipo}/>}
            </div>
            {!produtoSelecionado.status&& produtosSelecionados.length > 0 && <button className={styles.finalizarBtn} onClick={finalizaSolicitacaoTroca}>Finalizar Solicitação</button>}
            {!produtoSelecionado.status&& produtosSelecionados.length <= 0 && <button className={styles.finalizarBtninactive}>Sem produtos selecionados</button>}
        </div>
    </div>
  )
}

export default ModalTroca
