import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Produto.module.css'
import { empresas } from '../../../../DB/empresas'
import Quantidade from '../../../Quantidade/Quantidade';
import Grade from '../../../Grade/Grade';
import { GlobalContext } from '../../../../Context/GlobalContext';
const Produto = ({ cargoID }) => {
  const [produtos, setProdutos] = useState([]);
  const [currtenProduto, setCurrentProduto] = useState(0);
  const [direction, setDirection] = useState(''); // Estado para controlar a direção da animação
  const {carrinho,setCarrinho,quantidade, setPopUp,popupTimeoutRef,setQuantidade, tamanhoSelecionado} = useContext(GlobalContext);
  
  const sizeBay=useRef();
  const currentProdForSizebay=useRef();

  useEffect(() => {
    if (sizeBay.current && produtos.length > 0) {
      // Certificando de que a função SizebayInitLookbook está disponível
      setTimeout(()=>{
        if(direction === 'right' || 'left'){
          setDirection('')          
        }
      },350)

      async function initSizebay(){
        if (typeof window.SizebayInitLookbook === 'function') {
          SizebayInitLookbook();
        } else {
          console.error('Função SizebayInitLookbook não encontrada');
        }
      };
      initSizebay();
    }
  }, [produtos,direction]);
  
  
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
    return <div></div>;
  }

  const handlePrevious = () => {
    if (currtenProduto > 0) { // Verifica se há um produto anterior
      setDirection('left'); // Define a direção da animação como da esquerda
      setCurrentProduto((current) => current - 1);
    } else {
      console.warn("Não há mais produtos anteriores!");
    }
  };
  
  const handleNext = () => {
    if (currtenProduto < produtos.length - 1) { // Verifica se há um próximo produto
      setDirection('right'); // Define a direção da animação como da direita
      setCurrentProduto((current) => current + 1);
    } else {
      console.warn("Não há mais produtos à frente!");
    }
  };

  const handleADDProduct = (selectedSize) => {
    if (!produtos[currtenProduto]) {
      console.error("Produto não encontrado!");
      return;
    }
  
    // Verifica se o carrinho é válido
    const carrinhoAtual = carrinho || [];
  
    // Verifica se o produto com o mesmo código e tamanho já existe no carrinho
    const produtoExistente = carrinhoAtual.find(
      (item) =>
        item.cod === produtos[currtenProduto].codigo &&
        item.tamanho === selectedSize // Verifica também o tamanho
    );
  
    if (produtoExistente) {
      // Se o produto já estiver no carrinho com o mesmo tamanho, atualiza a quantidade
      const novoCarrinho = carrinhoAtual.map((item) =>
        item.cod === produtos[currtenProduto].codigo && item.tamanho === selectedSize
          ? { ...item, quantidade: item.quantidade + quantidade } // Atualiza a quantidade
          : item
      );
      setCarrinho(novoCarrinho);
    } else {
      // Se for um novo produto ou um tamanho diferente, adiciona ao carrinho
      const novoCarrinho = [
        ...carrinhoAtual,
        {
          cod: produtos[currtenProduto].codigo,
          descricao: produtos[currtenProduto].descricao,
          preco: produtos[currtenProduto].preco,
          cor: produtos[currtenProduto].cor,
          img:produtos[currtenProduto].img,
          tamanho: selectedSize, // Adiciona o tamanho selecionado
          quantidade: quantidade, // Adiciona a quantidade selecionada
        },
      ];
      setCarrinho(novoCarrinho);
    }
  
    setPopUp({
      status: true,
      color: "#46bba2",
      children: "Produto Adicionado ao Carrinho",
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
    }, 3000);
  
    setQuantidade(1);
  };
  
  return (
    <div className={styles.containerProduto}>
      <div 
        id={produtos[currtenProduto].codigo} 
        ref={currentProdForSizebay} 
        className={`${styles.Produto} ${direction === 'right'? styles['slide-right']: ''}  ${direction === 'left' ?styles['slide-left']:''}`}
      >
        <img
          src={`/src/images/produtos/${produtos[currtenProduto].img}`} 
          alt={produtos[currtenProduto].codigo} 
          className={styles.imgProduto}
        />
        <div className={styles.sobreProduto}>
          <h1 className={styles.descricao} >{produtos[currtenProduto].descricao}</h1>
          <div  className={styles.infoProd}>
            <div className={styles.column1}>
              <span className={styles.cor}>Cod.: {produtos[currtenProduto].codigo}</span>
              <span className={styles.cor}>Cor: <span>{produtos[currtenProduto].cor}</span></span>
              <span className={styles.preco}>R$ {produtos[currtenProduto].preco}</span>
            </div>
            <div className={styles.column2}>
                <Grade grade={produtos[currtenProduto].grade}/>
              {/*-------------------------------SIZEBAY-------------------------------*/}
              <div className={styles.provador} ref={sizeBay} data-produto={produtos[currtenProduto].codigo}>              
              
              </div>
            </div>

          </div>
            <Quantidade/>
              <button className={styles.addcarrinho} onClick={() => handleADDProduct(tamanhoSelecionado)}>Adicionar Carrinho +</button>
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
