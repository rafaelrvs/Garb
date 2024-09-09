import React, { useContext, useEffect, useState } from 'react'
import styles from './Produto.module.css'
import { empresas } from '../../../../DB/empresas'
import Quantidade from '../../../Quantidade/Quantidade';
import Grade from '../../../Grade/Grade';
import { GlobalContext } from '../../../../Context/GlobalContext';

const Produto = ({ cargoID }) => {
  const [produtos, setProdutos] = useState([]);
  const [currtenProduto, setCurrentProduto] = useState(0);
  const [direction, setDirection] = useState('slide-left'); // Estado para controlar a direção da animação
  const {carrinho,setCarrinho,quantidade, setPopUp,popupTimeoutRef,setQuantidade} = useContext(GlobalContext);

  useEffect(() => {
    const empId = window.localStorage.getItem('currentEmpresa');
    const empresa = empresas.filter((empresa) => empresa.id == empId);
    if (empresa.length === 0) {
      console.error("Empresa não encontrada");
      return;
    }
    const cargos = empresa[0].cargos;
    const prod = cargos.filter((cargo) => cargo.id == cargoID);
    if (prod.length === 0) {
      console.error("Cargo não encontrado");
      return;
    }
    setProdutos(prod[0].produtos);
  }, [cargoID]);

  if (!produtos.length) {
    return <div>Carregando produtos...</div>;
  }

  const handlePrevious = () => {
    setDirection('left'); // Define a direção da animação como da esquerda
    setCurrentProduto((current) => Math.max(0, current - 1));
  };

  const handleNext = () => {
    setDirection('right'); // Define a direção da animação como da direita
    setCurrentProduto((current) => Math.min(produtos.length - 1, current + 1));
  };

  const handleADDProduct = () => {
    if (!produtos[currtenProduto]) {
      console.error("Produto não encontrado!");
      return;
    }
  
    // Verifica se o carrinho é válido
    const carrinhoAtual = carrinho || [];
  
    // Verifica se o produto já existe no carrinho
    const produtoExistente = carrinhoAtual.find(item => item.cod === produtos[currtenProduto].codigo);
  
    if (produtoExistente) {
      // Se o produto já estiver no carrinho, apenas atualiza a quantidade
      const novoCarrinho = carrinhoAtual.map(item =>
        item.cod === produtos[currtenProduto].codigo
          ? { ...item, quantidade: item.quantidade + quantidade } // Atualiza a quantidade
          : item
      );
      setCarrinho(novoCarrinho);
    } else {
      // Se for um novo produto, adiciona ao carrinho com a quantidade definida
      const novoCarrinho = [
        ...carrinhoAtual,
        {
          cod: produtos[currtenProduto].codigo,
          descricao: produtos[currtenProduto].descricao,
          preco: produtos[currtenProduto].preco,
          cor: produtos[currtenProduto].cor,
          quantidade: quantidade // Adiciona a quantidade selecionada
        }
      ];
      setCarrinho(novoCarrinho);
    }
    setPopUp({
      status:true,
      color: "#46bba2",
      children: "Produto Adicionado ao Carrinho"
    });
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
  }

    popupTimeoutRef.current = setTimeout(() => {
        setPopUp({
            status: false,
            color: "",
            children: ""
        });
        popupTimeoutRef.current = null;
    }, 3000);
    setQuantidade(1)
  };

  return (
    <div className={styles.containerProduto}>
      <div className={`${styles.Produto} ${direction === 'right'? styles['slide-right'] : styles['slide-left']}`}>
        <img
          src={`/src/images/produtos/${produtos[currtenProduto].img}`} 
          alt={produtos[currtenProduto].codigo} 
          className={styles.imgProduto}
        />
        <div className={styles.sobreProduto}>
          <h1 className={styles.descricao} >{produtos[currtenProduto].descricao}</h1>
          <span className={styles.fiealdCod}>Cod.: {produtos[currtenProduto].codigo}</span>
          <div className={styles.qtdCorPreco}>
            <div className={styles.precoCor}>
              <span className={styles.preco}>R$ {produtos[currtenProduto].preco}</span>
              <span className={styles.cor}>Cor: <span>{produtos[currtenProduto].cor}</span></span>
            </div>
              <Quantidade/>
          </div>
            <div className={styles.footerProduto}  >
              <div className={styles.provador}>
                <p>Tabela de Medidas</p>
                <p>Provador Virtual</p>
              </div>
              <div className={styles.carrinhGrade}>
                <Grade  grade={produtos[currtenProduto].grade}  />
                <button className={styles.addcarrinho} onClick={handleADDProduct} >Adicionar</button>
              </div>                 

            </div>
        </div>
      </div>
      <div className={styles.buttonsProduto}>
        <button onClick={handlePrevious}>{"<"}</button>
        <button onClick={handleNext}>{">"}</button>
      </div>
    </div>
  );
}

export default Produto;
