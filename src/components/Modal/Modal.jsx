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
console.log(produtoModal);

    return (
        <div className={styles.containerModal}>
            <p><span onClick={() => setModal(false)}>X</span></p>
            <div className={styles.containerPedidoHeader}>
                <p>Pedido ID:<br /> {pedidoSelecionado.id}</p>
                <p>Status:<br /> {pedidoSelecionado.status}</p>
                <p>Quantidade Total:<br />{pedidoSelecionado.qtdeTotal}</p>
                <p>Valor Total:<br /> {pedidoSelecionado.valorTotal}</p>

            </div>
            <hr className={styles.hr} />
            <div className={styles.containerContent}>
                {produtoModal.map((item, index) => (
                    <div key={index} className={styles.produtoListado}>
                       <div>
                        Codigo:
                             <p>{item.cod}</p>
                        </div> 
                       <div>
                        Tamanho:
                             <p>{item.tamanho}</p>
                        </div> 
                       <div>
                        Cor:
                             <p>{item.cor}</p>
                        </div> 
                       <div>
                        Quantidade:
                             <p>{item.quantidade}</p>
                        </div> 
                       <div>
                        Preço R$
                             <p>{item.preco}</p>
                        </div> 
                    </div>
                ))}

            </div>

        </div>
    );
}
