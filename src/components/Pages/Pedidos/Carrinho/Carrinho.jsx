import React, { useContext, useEffect, useState } from 'react';
import styles from './Carrinho.module.css';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';
import QuantidadeFPedido from '../../../QuantidadeFPedido/QuantidadeFPedido';
import Voltar from '../../../Voltar/Voltar';
import fretes from '../../../../DB/frete.js'
import metodosPagamento from '../../../../DB/metodosPagamento.js'
import checkSVG from '/images/check.svg'
import crossSVG from '/images/cross.svg'

const Carrinho = () => {
  const { carrinho, quantidades } = useContext(GlobalContext);
  const [qtdeTotal, setQtdeTotal] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [formaPagSelecionado, setFormaPagSelecionado] = useState({
    selecionado: false,
    data:{}
  })
  const [campoFrete, setcampoFrete] = useState({
    status: false,
    freteID: "",
    nome: "",
    preco: 0,
    url: ""
  });
  const [metPagamento,setMetPagamento]=useState({
    status:false,
  })
  const [somaFrete, setSomaFrete] = useState(false)
  const [error, setError] = useState(false);
  const [metodoSelecionado, setMetodoSelecionado] = useState(null);

  const navigate = useNavigate();

  // Função para gerar um ID aleatório de 4 dígitos
  const generateOrderId = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  function handleSubmit() {
    if(campoFrete.status && formaPagSelecionado.selecionado){
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
        },
        metdPagamento:{
          nome: formaPagSelecionado.data.nome,
          acrescimo: formaPagSelecionado.data.acrescimo,
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

  function activeFrete(frete) {
    setcampoFrete({
      status: true,
      freteID: frete.id,
      nome: frete.nome,
      preco: frete.preco,
      url: frete.url
    })
  }

  function handlePagamento(){
    setMetPagamento({status: !metPagamento.status,})
  }

  const handleMetodoChange = (metodoId,acrescimo,nome) => {
    setMetodoSelecionado(metodoId);    
    setMetPagamento({
      status: !metPagamento.status,
    })
    setFormaPagSelecionado({
      selecionado: true,
      data:{
        nome,
        acrescimo
      }
    })
  };

  return (
    <>
      <Voltar />
      <section className={styles.Container}>
        <div className={`${styles.colunaUm} animeLeft`}>
          {carrinho.length&& !metPagamento.status && (
            carrinho.map((produto,index) => (
              <div key={`${produto.cod}-${produto.tamanho}` || index} className={`${styles.produto}`}>
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
          )}
          {metPagamento.status &&(
            <>
            {metodosPagamento.map((metodo, index) => (
              <div 
                className={styles.linhaMetodoPagamento}
                key={(metodo.id || index)}
                onClick={() => handleMetodoChange(metodo.id, metodo.acrescimo, metodo.nome)}  
              >
                <input
                  type="radio"
                  name="metodoPagamento"
                  value={metodo.id}
                  checked={metodoSelecionado === metodo.id}
                  onChange={() => handleMetodoChange(metodo.id, metodo.acrescimo, metodo.nome)}   
                />
                <label htmlFor={`metodo-${metodo.id}`} className={styles.textMetodoPagamento}>
                  {metodo.nome}
                </label>
                <span className={styles.textMetodoPagamento}>
                  R$ {(valorTotal * (1 + metodo.acrescimo)).toFixed(2)}
                </span>
              </div>
            ))}
          </>
          )}
        </div>

        <div className={styles.colunaDois}>
          <p>Qtde. Total: {qtdeTotal}</p>
          <p>Frete:{campoFrete.preco}</p>
          <p>forma de pag: {formaPagSelecionado.data.nome || 0}</p>
          <p>Valor Total: R$ {(valorTotal * (1 + (formaPagSelecionado.data.acrescimo || 0))).toFixed(2)}</p>

          <button className={`${styles.btnFinalizar} ${styles.button}`} onClick={handleSubmit} disabled={!carrinho.length}>
            Finalizar Pedido
          </button>
          <Link to="/pedidos">
            <button className={styles.button}>Adicionar mais Produtos</button>
          </Link>
        </div>

        {/*metodo de pagamento*/}
        <div className={styles.containerMetPagamento} >
          <button className={styles.button} onClick={handlePagamento}>Método de pagamento</button>
          <img 
            src={formaPagSelecionado.selecionado? checkSVG : crossSVG} 
            alt="status de seleção de pagamento" 
            className={error&& !formaPagSelecionado.selecionado ? styles.statusFormaPagAnimation : styles.statusFormaPag}          
          />
          
        </div>

        {/*Frete*/}
        <div className={error&& !campoFrete.status ? styles.colunaDoisEmpity:styles.colunaDoisFret}   >
          <h1 className={styles.tituloFrete}>Escolha forma de entrega</h1>
          <div className={styles.containerFretes}>
            {fretes.map((frete) => (
              <div
                className={campoFrete.status && campoFrete.freteID === frete.id ? styles.contentFreteActive : styles.contentFrete}
                onClick={() => { activeFrete(frete) }}
                key={frete.id}
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
