import React, { useState } from 'react';
import styles from "./PedidoMacro.module.css";

const PedidoMacro = () => {
  const [codProduto, setCodProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [idPedido, setIdPedido] = useState(""); // Novo estado para armazenar o ID do pedido
  const [quantidade, setQuantidade] = useState(""); // Novo estado para armazenar a quantidade
  const [valor, setValor] = useState(""); // Novo estado para armazenar o valor
  const [btn, setBtnAtivo] = useState(false); // Novo estado para armazenar o valor

  const pedidosData = JSON.parse(window.localStorage.getItem('pedidos')) || [];
console.log(btn);

  function pesquisaItem() {
    let found = false;

    pedidosData.forEach(pedido => {
      const produtoEncontrado = pedido.produtos.find(produto => produto.cod === codProduto);

      if (produtoEncontrado) {
        setDescricao(produtoEncontrado.descricao); // Atualiza a descrição do produto
        setIdPedido(pedido.id); // Armazena o ID do pedido
        setQuantidade(produtoEncontrado.quantidade); // Armazena a quantidade do produto
        setValor(produtoEncontrado.preco); // Armazena o valor do produto
        found = true;
      }
    });

    if (!found) {
      setDescricao("Produto não encontrado");
      setIdPedido(""); // Limpa o estado do ID se o produto não for encontrado
      setQuantidade(""); // Limpa o estado da quantidade se o produto não for encontrado
      setValor(""); // Limpa o estado do valor se o produto não for encontrado
    }
  }

  function handleClick() {
    if( codProduto.length >=10){
      setBtnAtivo(true)
    }else{
      setBtnAtivo(false)

    }
    pesquisaItem();
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
          onChange={(e) => setCodProduto(e.target.value)}
        />

        <input className={styles.btn} type="button" value="Consultar" onClick={handleClick} />
      </div>

      {/* Div com alternância de classe baseada no estado do botão */}
      <div className={btn === true || codProduto.length >=10 ? styles.result : ""}>
        {
          <>
            <p className={styles.itemID}><strong>Descrição:</strong> {descricao}</p>
            <p className={styles.itemID}><strong>ID do Pedido:</strong> {idPedido}</p>
            <p className={styles.itemID}><strong>Quantidade:</strong> {quantidade}</p>
            <p className={styles.itemID}><strong>Valor:</strong>  {valor}</p>
          </>
        }
      </div>
    </div>
  );
}

export default PedidoMacro;
