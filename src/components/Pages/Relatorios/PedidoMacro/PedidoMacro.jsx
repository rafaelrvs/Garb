import React, { useState } from 'react';
import styles from './PedidoMacro.module.css';

const PedidoMacro = () => {
  const [codProduto, setCodProduto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pedidosEncontrados, setPedidosEncontrados] = useState([]); // Estado que armazena IDs, quantidades e valores
  const [btnAtivo, setBtnAtivo] = useState(false);

  const pedidosData = JSON.parse(window.localStorage.getItem('pedidos')) || [];

  function pesquisaItem() {
    let found = false;
    let pedidosComDetalhes = []; // Array para armazenar os IDs, quantidades e valores dos pedidos encontrados

    pedidosData.forEach((pedido) => {
      const produtoEncontrado = pedido.produtos.find(
        (produto) => produto.cod === codProduto
      );

      if (produtoEncontrado) {
        setDescricao(produtoEncontrado.descricao);
        pedidosComDetalhes.push({
          id: pedido.id,
          quantidade: produtoEncontrado.quantidade, // Armazena a quantidade do produto no pedido
          valor: produtoEncontrado.preco, // Armazena o valor do produto no pedido
        });
        found = true;
      }
    });

    if (found) {
      setPedidosEncontrados(pedidosComDetalhes); // Armazena os pedidos encontrados com suas respectivas quantidades e valores
    } else {
      setDescricao('Produto não encontrado');
      setPedidosEncontrados([]); // Limpa o estado se o produto não for encontrado
    }
  }

  function handleClick() {
    pesquisaItem();
  }

  function handleCodProdutoChange(e) {
    const newCodProduto = e.target.value;
    setCodProduto(newCodProduto);
    setBtnAtivo(newCodProduto.length >= 10);
  }

  // Função para imprimir a tabela
  function handlePrint() {
    window.print();
  }

  return (
    <div className={styles.containerMacro}>
      <div className={styles.containerInput}>
        <label>Consulte Nº</label>
        <input
          type="text"
          className={styles.inputText}
          placeholder="Código do Produto"
          value={codProduto}
          onChange={handleCodProdutoChange}
        />

        <input
          className={styles.btn}
          type="button"
          value="Consultar"
          onClick={handleClick}
          disabled={!btnAtivo}
        />
      </div>

      <div className={styles.result}>
        <>
          <p className={styles.itemID}>
            <strong>Descrição:</strong> {descricao}
          </p>
          <div className={styles.pedidos}>
            <strong>Pedidos:</strong>
            {pedidosEncontrados.length > 0 ? (
              <>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID do Pedido</th>
                      <th>Quantidade</th>
                      <th>Valor uni</th>
                      <th>Valor total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidosEncontrados.map((pedido, index) => (
                      <tr key={index}>
                        <td>{pedido.id}</td>
                        <td>{pedido.quantidade}</td>
                        <td>R$: {pedido.valor}</td>
                        <td>R$:{(pedido.valor * pedido.quantidade).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className={styles.btnPrint} onClick={handlePrint}>
                  Imprimir Tabela
                </button>
              </>
            ) : (
              <p>Nenhum pedido encontrado</p>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default PedidoMacro;
