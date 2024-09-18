import React, { useContext, useEffect, useState } from 'react';
import styles from './Carrinho.module.css';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';
import QuantidadeFPedido from '../../../QuantidadeFPedido/QuantidadeFPedido';
import Voltar from '../../../Voltar/Voltar';

const Carrinho = () => {
  const { carrinho, quantidades } = useContext(GlobalContext);
  const [qtdeTotal, setQtdeTotal] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const navigate = useNavigate()
  // Função para gerar um ID aleatório de 4 dígitos
  const generateOrderId = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  function handleSubmit() {
    const carrinhoAtualizado = carrinho.map(produto => ({
      ...produto,
      quantidade: quantidades[`${produto.cod}-${produto.tamanho}`] || produto.quantidade,
    }));

    const novoPedido = {
      id: generateOrderId(),
      produtos: carrinhoAtualizado,
      status: 'Aguardando análise', // Status inicial do pedido
      qtdeTotal,
      valorTotal,
      data: new Date().toLocaleDateString(), // Opcional: adicionar data do pedido
    };

    // Verificar se já existem pedidos no localStorage
    const pedidosExistentes = JSON.parse(localStorage.getItem('pedidos')) || [];

    // Adicionar o novo pedido à lista de pedidos
    const pedidosAtualizados = [...pedidosExistentes, novoPedido];

    // Armazenar os pedidos atualizados no localStorage
    localStorage.setItem('pedidos', JSON.stringify(pedidosAtualizados));
    localStorage.removeItem('carrinho')
    navigate('/pedidos/AcompanharPedidos')
    window.location.reload()
  }

  useEffect(() => {
    const calcularTotais = () => {
      let qtde = 0;
      let valor = 0;
      carrinho.forEach(produto => {
        const quantidade = quantidades[`${produto.cod}-${produto.tamanho}`] || produto.quantidade || 1;
        qtde += quantidade;
        valor += Number(produto.preco) * quantidade;
      });
      setQtdeTotal(qtde);
      setValorTotal(valor);
    };

    calcularTotais();
  }, [carrinho, quantidades]);

  return (
    <>
        <Voltar/>
    <section className={styles.Container}>
      <div className={styles.colunaUm}>
        {carrinho.length ? (
          carrinho.map(produto => (
            <div key={`${produto.cod}-${produto.tamanho}`} className={styles.produto}>
              <img src={`/images/produtos/${produto.img}`} alt="" />
              <h1 className={styles.nome}>{produto.descricao}</h1>
              <h1 className={styles.tamanho}>Tamanho: {produto.tamanho}</h1>
              <span className={styles.preco}>Preço: R${produto.preco}</span>
              <span className={styles.quantidade}>Qtde:</span>
              <div className={styles.qtdeBtn}>
                <QuantidadeFPedido productId={produto.cod} tamanho={produto.tamanho} currentQtde={produto.quantidade} />
              </div>
            </div>
          ))
        ) : (
          <p>Sem produtos em seu carrinho</p>
        )}
      </div>

      <div className={styles.colunaDois}>
        <p>Qtde. Total: {qtdeTotal}</p>
        <p>Valor Total: R$ {valorTotal.toFixed(2)}</p>
        <button className={`${styles.btnFinalizar} ${styles.button}`} onClick={handleSubmit} disabled={!carrinho.length}>
          Finalizar Pedido
        </button>
        <Link to="/pedidos">
          <button className={styles.button}>Adicionar mais Produtos</button>
        </Link>
      </div>
    </section>
    </>
  );
};

export default Carrinho;
