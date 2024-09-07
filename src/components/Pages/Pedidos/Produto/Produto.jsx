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
  const { ativaImagem, setAtivaImagem } = useContext(GlobalContext);

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
    console.log("Produtos carregados:", prod[0].produtos); // Verifique se os produtos são carregados
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

  return (
    <div className={ativaImagem? styles.containerProdutoAtivo:styles.containerProduto}>
      <div className={ativaImagem?styles.imagemProdAtiva:`${styles.Produto} ${direction === 'right'? styles['slide-right'] : styles['slide-left']}`}>
        <img 
          src={`/src/images/produtos/${produtos[currtenProduto].img}`} 
          alt={produtos[currtenProduto].codigo} 
          className={!ativaImagem?styles.imgProduto:styles.imgProdutoAtivo}


        onClick={()=>setAtivaImagem(!ativaImagem)}  
        />
        <div className={ativaImagem?styles.produtoImagemAtiva:styles.sobreProduto}>
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
              
              <Grade  produtos={{produtos}}  />
              <button className={styles.carrinho} >Adicionar</button>

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
