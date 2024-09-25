import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Produto.module.css';
import { empresas } from '../../../../DB/empresas';
import Quantidade from '../../../Quantidade/Quantidade';
import Grade from '../../../Grade/Grade';
import { GlobalContext } from '../../../../Context/GlobalContext';

const Produto = ({ cargoID }) => {
  const [produtos, setProdutos] = useState([]);
  const [currtenProduto, setCurrentProduto] = useState(0);
  const [direction, setDirection] = useState(''); 
  const { carrinho, setCarrinho, quantidade, setPopUp, popupTimeoutRef, setQuantidade, tamanhoSelecionado } = useContext(GlobalContext);
  const [gradeAnimacao, setGradeAnimacao] = useState(false);

  const sizeBay = useRef();
  const sizeBayInitialized = useRef(false);  // Novo ref para controlar a inicialização
  const currentProdForSizebay = useRef();

  useEffect(() => {
    if (sizeBay.current && produtos.length > 0) {
      setTimeout(() => {
        if (direction === 'right' || 'left') {
          setDirection('');          
        }
      }, 350);

      async function initSizebay() {
        if (!sizeBayInitialized.current) { // Executa apenas se não foi inicializado
          if (typeof window.SizebayInitLookbook === 'function') {
            SizebayInitLookbook();
            sizeBayInitialized.current = true; // Marca como inicializado
          } else {
            console.error('Função SizebayInitLookbook não encontrada');
          }
        }
      }
      initSizebay();
    }
  }, [produtos, direction]);

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
    sizeBayInitialized.current = false;  // Reseta a inicialização ao trocar de cargo
  }, [cargoID]);

  if (!produtos.length) {
    return <div></div>;
  }

  const handlePrevious = () => {
    if (currtenProduto > 0) {
      setDirection('left');
      setCurrentProduto((current) => current - 1);
      sizeBayInitialized.current = false;  // Marca como não inicializado para o novo produto
    } else {
      console.warn("Não há mais produtos anteriores!");
    }
  };

  const handleNext = () => {
    if (currtenProduto < produtos.length - 1) {
      setDirection('right');
      setCurrentProduto((current) => current + 1);
      sizeBayInitialized.current = false;  // Marca como não inicializado para o novo produto
    } else {
      console.warn("Não há mais produtos à frente!");
    }
  };

  const handleADDProduct = (selectedSize) => { 
    
    if(tamanhoSelecionado !== ""){
    setGradeAnimacao(false)

    
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
  }else{
    setGradeAnimacao(true)
  }
  };

  return (
    <div className={styles.containerProduto}>
      <div 
        id={produtos[currtenProduto].codigo} 
        ref={currentProdForSizebay} 
        className={`${styles.Produto} ${direction === 'right'? styles['slide-right']: ''}  ${direction === 'left' ?styles['slide-left']:''}`}
        >
        <img
          src={`/images/produtos/${produtos[currtenProduto].img}`} 
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
              <div className={styles.provador} ref={sizeBay} data-produto={produtos[currtenProduto].codigo}>              
              </div>
              <Grade grade={produtos[currtenProduto].grade} gradeAnimacao={gradeAnimacao} />
              {gradeAnimacao && <p className={styles.alertGrade}> Selecione um tamanho !</p>}
            </div>
          </div>
          <Quantidade />
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
