import React, { useContext, useEffect, useState } from 'react';
import styles from './Carrinho.module.css';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';
import QuantidadeFPedido from '../../../QuantidadeFPedido/QuantidadeFPedido';
import Voltar from '../../../Voltar/Voltar';
import fretes from '../../../../DB/frete.js'


const Carrinho = () => {
  const { carrinho, quantidades } = useContext(GlobalContext);
  const [qtdeTotal, setQtdeTotal] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [campoFrete, setcampoFrete] = useState({
    status: false,
    freteID: "",
    nome: "",
    preco: 0,
    url: ""
  });
  const [somaFrete, setSomaFrete] = useState(false)
  const [error, setError] = useState(false);
  const navigate = useNavigate()



  // Função para gerar um ID aleatório de 4 dígitos
  const generateOrderId = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  function handleSubmit() {
    if(campoFrete.status){

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
        frete: {
          nomeFrete: campoFrete.nome,
          preco: campoFrete.preco,
        }
        
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
    else{
      setError(true)
      
      setTimeout(()=>{
        setError(false)

      },1200)
    }
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
    
        setSomaFrete(true)
        if(somaFrete){
          setValorTotal(valor + campoFrete.preco)
        }
      };
    
      calcularTotais();
    }, [carrinho, quantidades, campoFrete,somaFrete]);

  useEffect(() => {
    console.log(campoFrete);

  }, [campoFrete])

  function activeFrete(frete) {
    setcampoFrete({
      status: true,
      freteID: frete.id,
      nome: frete.nome,
      preco: frete.preco,
      url: frete.url
    })
  }

  return (
    <>
      <Voltar />
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
          <p>Frete:{campoFrete.preco}</p>
          <p>Valor Total: R$ {valorTotal.toFixed(2)}</p>

          <button className={`${styles.btnFinalizar} ${styles.button}`} onClick={handleSubmit} disabled={!carrinho.length}>
            Finalizar Pedido
          </button>
          <Link to="/pedidos">
            <button className={styles.button}>Adicionar mais Produtos</button>
          </Link>

        </div>

        {/*Fret*/}

        <div className={error? styles.colunaDoisEmpity:styles.colunaDoisFret}   >
          <h1 className={styles.tituloFrete}>Escolha forma de entrega</h1>
          <div className={styles.containerFretes}>
            {fretes.map((frete) => (
              <div
                className={campoFrete.status && campoFrete.freteID === frete.id ? styles.contentFreteActive : styles.contentFrete}
                onClick={() => { activeFrete(frete) }}
              >
                <img
                  className={styles.imgTruck}
                  src={frete.src}
                  alt="transporte" />
                <div className={styles.infoFrete}>
                  <p key={frete.id}>{frete.nome}</p>
                  <p >{frete.preco}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>
    </>
  );
};

export default Carrinho;
