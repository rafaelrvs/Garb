import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Modal.module.css';
import { GlobalContext } from '../../Context/GlobalContext';
import CryptoJS from 'crypto-js';
export const Modal = () => {
    const { setModal, pedidos, valueModal } = useContext(GlobalContext);
    const [produtoModal, setProdutoModal] = useState([]);
    // Filtrando o pedido com o ID correspondente a valueModal
    const pedidoSelecionado = pedidos.find(e => e.id === valueModal);
    
    const voltar = useRef()
    function closeModal(event) {
        if (event.currentTarget === voltar.current) {
            setModal(false)
        }
    }


    
    const mensagem = `seu id ${pedidoSelecionado.id} cor ${pedidoSelecionado.cor}`;
    const chave = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef');
    const vi = CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210');
    const mensagemCifrada = CryptoJS.AES.encrypt(mensagem, chave, { iv: vi }).toString();
    useEffect(() => {
        if (pedidoSelecionado) {
            setProdutoModal(pedidoSelecionado.produtos);
        }
        console.log(pedidoSelecionado);
    }, [pedidoSelecionado]); // Atualiza quando o pedidoSelecionado mudar




console.log();


    return (
        <div className={styles.containerModal}>
            <div className={styles.modal}>
                <div className={styles.contentInModal}>

                    <div className={styles.headerModalPedidos}>

                        <div className={styles.voltarContainer} onClick={closeModal} ref={voltar}>
                            <div className={styles.voltarBtn}>{'<'}</div>
                        </div>

                        <p className={styles.itemHeaderModal} > <strong>Pedido ID:</strong>{pedidoSelecionado.id}</p>
                        <p className={styles.itemHeaderModalstatus} > <strong>Status:</strong> {pedidoSelecionado.status} </p>
                        <p className={styles.itemHeaderModal} > <strong>Quantidade Total:</strong>  {pedidoSelecionado.qtdeTotal}</p>
                        <p className={styles.itemHeaderModal} > <strong>Valor Total:</strong> {"R$ "+pedidoSelecionado.valorTotal} </p>



                    </div>
               


                    <div className={styles.containerListaProduto} > 


                        <div className={styles.contentMainModal} >
                        <div className={styles.titleListaProduct}>
                        <strong className={styles.titlimg}>Imagem</strong>
                        <strong className={styles.title}>Codigo:</strong>
                        <strong className={styles.title}> Tamanho:</strong>
                        <strong className={styles.title}>Cor:</strong>
                        <strong className={styles.title}>Quantidade:</strong>
                        <strong className={styles.title}>Preço:</strong>

                    </div>

                            {produtoModal.map((item, index) => (

                                <div key={index} className={styles.produltoDaLista}>
                                    <div className={styles.containerImgModal}>
                                        <img className={styles.image} src={`/images/produtos/${item.img}`} alt="aaa" />
                                    </div>

                                    <p className={styles.itemListaProd}>{item.cod} </p>
                                    <p className={styles.itemListaProd}>{item.tamanho} </p>
                                    <p className={styles.itemListaProd}>{item.cor}</p>
                                    <p className={styles.itemListaProd}>{item.quantidade} </p>
                                    <p className={styles.itemListaProd}>{item.preco} </p>

                                 
                                </div>

                            ))}
                            
                        </div>
                        <div className={styles.containerAcompanhaProduto}>
                            <h1 className={styles.titleAcompanhamento}> Acompanhamento</h1>
                            <div className={styles.campoEstadoDetalhado}>
                                <span className={styles.itemEstado}></span>
                                <span className={styles.itemEstado}></span>
                                <span className={styles.itemEstado}></span>
                                <span className={styles.itemEstado}></span>
                                <hr className={styles.barraStatus} />
                            </div>
                               <div className={styles.statusPed}>

                                        <p className={styles.legendaStatus} >Pedido recebido</p>
                                        <p className={styles.legendaStatus} >Em analise</p>
                                        <p className={styles.legendaStatus} >Em Produção</p>
                                        <p className={styles.legendaStatus} >Em transito</p>
                                    </div>

                            <div className={styles.footerAcompanhamento} >
                                <p>Forma de pagamento:{ " "+pedidoSelecionado.metdPagamento.nome}</p>
                                <p>Frete:{" " + pedidoSelecionado.frete.preco}</p>
                              
                            </div>
                        </div>
                    </div>
           
                </div>

            </div>
        </div>
    );
}
