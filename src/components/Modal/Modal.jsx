import React, { useContext, useEffect, useState } from 'react';
import styles from './Modal.module.css';
import { GlobalContext } from '../../Context/GlobalContext';


export const Modal = () => {
    const { setModal, pedidos, valueModal } = useContext(GlobalContext);
    const [produtoModal, setProdutoModal] = useState([]);

    // Filtrando o pedido com o ID correspondente a valueModal
    const pedidoSelecionado = pedidos.find(e => e.id === valueModal);

    useEffect(() => {
        if (pedidoSelecionado) {
            setProdutoModal(pedidoSelecionado.produtos);
        }
    }, [pedidoSelecionado]); // Atualiza quando o pedidoSelecionado mudar






    return (
        <div className={styles.containerModal}>
            <div className={styles.modal}>
                <div className={styles.contentInModal}>
                    <div className={styles.headerModalPedidos}>
                        <p className={styles.itemHeaderModal} > <strong>Pedido ID:</strong>{pedidoSelecionado.id}</p>
                        <p className={styles.itemHeaderModal} > <strong>Status:</strong> {pedidoSelecionado.status} </p>
                        <p className={styles.itemHeaderModal} > <strong>Quantidade Total:</strong>  {pedidoSelecionado.qtdeTotal}</p>
                        <p className={styles.itemHeaderModal} > <strong>Valor Total:</strong> {pedidoSelecionado.valorTotal} </p>

                    </div>
                            <strong>Codigo:</strong>
                            <strong> Tamanho:</strong>
                            <strong>Cor:</strong>
                            <strong>Quantidade:</strong>
                            <strong>R$:</strong>
                           
                        </div>
                    <div className={styles.contentMainModal} >
                        <div className={styles.titleProd}>
                        {produtoModal.map((item, index) => (
                            
                            <div key={index} className={styles.produltoDaLista}>
                                <div className={styles.containerImgModal}>
                                    <img className={styles.image} src={`/images/produtos/${item.img}`} alt="aaa" />
                                </div>
                              
                                <p className={styles.itemListaProd}><strong  > Codigo:</strong>{item.cod} </p>
                                <p className={styles.itemListaProd}><strong  > Tamanho:</strong>{item.tamanho} </p>
                                <p className={styles.itemListaProd}><strong  > Cor:</strong>{item.cor} </p>
                                <p className={styles.itemListaProd}><strong  >Quantidade:</strong>{item.quantidade} </p>
                                <p className={styles.itemListaProd}><strong  > R$</strong>{item.preco} </p>

                            </div>

                        ))}
                    </div>
                </div>

            </div>


        </div>
    );
}
