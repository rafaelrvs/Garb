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
                    
                <p><span onClick={() => setModal(false)}>X</span></p>

                <div className={`${styles.containerPedidoHeader} animeLeft`}>
                    <p><strong> Pedido ID:          </strong> {pedidoSelecionado.id}</p>
                    <p><strong> Status:             </strong> {pedidoSelecionado.status}</p>
                    <p><strong> Quantidade Total:   </strong> {pedidoSelecionado.qtdeTotal}</p>
                    <p><strong> Valor Total:        </strong> {pedidoSelecionado.valorTotal}</p>
                </div>

                <hr className={styles.hr} />
                <section className={styles.containerSection}>
                    <div className={styles.containerContent}>
                        <div>
                            <br />
                            <h2>Item</h2>
                            <br />
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
                                    <img
                                        src={`/images/produtos/${item.img}`}
                                        alt="aaaa"
                                        className={styles.image}
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <br />
                            <h2>Detalhe</h2>
                            <br />
                            <div className={`${styles.containerDetalhe} animeLeft`} >
                                <h3>Acompanhamento</h3>

                                <div className={styles.statusPedido}>
                                    <p className={styles.status2}>
                                    
                                    </p>
                                    <p className={styles.status3}>

                                    </p>
                                    <p className={styles.status4}>

                                    </p>
                                    <p className={styles.status5}>

                                    </p>

                                    <hr className={styles.LinhaTempo} />


                                </div>
                                <span>
                                    <strong>

                                    Aprovação  
                                    </strong>
                                    <strong>

                                    Produção
                                    </strong>
                                    <strong>

                                    Envio
                                    </strong>
                                    <strong>

                                    Entrega
                                    </strong>
                                </span>

                                <hr className={styles.hrDetalhes} />
                                <p className={styles.frete}><strong>Transportadora:</strong>{pedidoSelecionado.frete.nomeFrete}</p>
                                <p className={styles.frete}><strong>valor Frete:</strong>{pedidoSelecionado.frete.preco}</p>
                                <p className={styles.CodRAstreio}> <strong>Cod Rastreio: </strong>121EF2A54S5D</p>
                        
                            </div>
                        
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
}
