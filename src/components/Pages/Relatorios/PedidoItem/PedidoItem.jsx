import React, { useContext, useState } from 'react';
import styles from './PedidoItem.module.css';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { empresas } from '../../../../DB/empresas';

export const PedidoItem = () => {
  const { pedidos } = useContext(GlobalContext);
  const [searchPedido, setSearchPedido] = useState('');
  const [escolheCargo, setEscolheCargo] = useState(''); // Cargo selecionado
  const [escolheStatus, setEscolheStatus] = useState(''); // Status selecionado
  const [dataInicio, setDataInicio] = useState(''); // Data inicial
  const [dataFim, setDataFim] = useState(''); // Data final
  const [filteredPedidos, setFilteredPedidos] = useState([]); // Pedidos filtrados
  const [filteredProducts, setFilteredProducts] = useState([]); // Produtos filtrados

  const todosCargos = empresas.flatMap((empresa) => empresa.cargos);
  const pediProdUnico = [...new Set(pedidos.flatMap((pedido) => pedido.status))];

  // Função para converter string de data para o formato DD/MM/YYYY utilizando o locale pt-BR
  const convertToDayMonthYear = (dateString) => {
    if (!dateString) return null;

    const [year, month, day] = dateString.split('-'); // Dividindo a string no formato YYYY-MM-DD
    return `${day}/${month}/${year}`; // Retornando no formato DD/MM/YYYY
  };

  // Função para converter a data de DD/MM/YYYY para um objeto Date para comparação
  const parseDate = (dateString) => {
    if (!dateString) return null;

    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`); // Criando um objeto Date
  };

  const filtraPedido = () => {
    const pedidosData = JSON.parse(window.localStorage.getItem('pedidos')) || [];
  
    // Convertendo datas de filtro para objetos Date
    const dataInicioDate = parseDate(convertToDayMonthYear(dataInicio));
    const dataFimDate = parseDate(convertToDayMonthYear(dataFim));
  
    // Filtrar os pedidos com base nas seleções
    const pedidosFiltrados = pedidosData.filter((pedido) => {
      const filtroPedido = searchPedido ? pedido.id === Number(searchPedido) : true;
      const filtroStatus = escolheStatus ? pedido.status === escolheStatus : true;

      // Comparando a data de emissão (convertida para DD/MM/YYYY)
      const dataPedido = parseDate(pedido.data);
      const filtroData = dataInicioDate && dataFimDate
        ? dataPedido >= dataInicioDate && dataPedido <= dataFimDate
        : true;
  
      return filtroPedido && filtroStatus && filtroData;
    });
  
    // Restante da lógica de filtragem
    if (escolheCargo) {
      const empresaSelecionada = empresas.find((empresa) =>
        empresa.cargos.some((cargo) => cargo.nome === escolheCargo)
      );
      const cargoSelecionado = empresaSelecionada?.cargos.find((cargo) => cargo.nome === escolheCargo);
  
      if (cargoSelecionado) {
        const pedidosComProdutosFiltrados = pedidosFiltrados.filter((pedido) =>
          pedido.produtos.some((produto) =>
            cargoSelecionado.produtos.some((filteredProduto) => filteredProduto.codigo === produto.cod)
          )
        );
        setFilteredPedidos(pedidosComProdutosFiltrados);
        setFilteredProducts(cargoSelecionado.produtos);
      } else {
        setFilteredPedidos([]);
        setFilteredProducts([]);
      }
    } else {
      setFilteredPedidos(pedidosFiltrados);
      setFilteredProducts([]);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    filtraPedido();
  };

  return (

     
      <form onSubmit={handleClick}>
        <div className={styles.containerFiltroum}>
          <label htmlFor="" className={styles.itemfiltroLista1}>
            <p>Nº Pedido</p>
            <input
              type="text"
              className={styles.inputText}
              value={searchPedido}
              onChange={(e) => setSearchPedido(e.target.value)}
            />
          </label>

          <label htmlFor="" className={styles.itemfiltroLista1}>
            <p>Cargo</p>
            <select
              className={styles.cargo}
              value={escolheCargo}
              onChange={(e) => setEscolheCargo(e.target.value)}
            >
              <option className={styles.itemOption} value="">
                Selecione um cargo
              </option>
              {todosCargos.map((item, index) => (
                <option className={styles.itemOption} value={item.nome} key={index}>
                  {item.nome}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="" className={styles.itemfiltroLista1}>
            <p>Status</p>
            <select
              className={styles.status}
              value={escolheStatus}
              onChange={(e) => setEscolheStatus(e.target.value)}
            >
              {pediProdUnico.map((item, index) => (
                <option className={styles.itemOption} value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <hr className={styles.divisoria} />
        <div className={styles.FiltroInicialdois}>
          <p className={styles.dataEmissao}>Data Emissão(de):</p>
          <div className={styles.itensFiltro2}>
            <div className={styles.containerData1}>
              <label htmlFor="data1">De</label>
              <input
                type="date"
                id="data1"
                name="data1"
                className={styles.data}
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div className={styles.cotainerdata2}>
              <label htmlFor="data2">Até</label>
              <input
                type="date"
                name="data2"
                id="data2"
                className={styles.data}
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                />
            </div>
            <button className={styles.btn}>Buscar</button>
          </div>
        </div>
        <hr className={styles.divisoria} />

        <div className={styles.containerResultado}>
                
          <h3 className={styles.titleResult}>Resultado</h3>
          <div className={styles.fieldResult}>
            <div className={styles.headerRelatorio}>
              <p>Nº Pedido</p>
              <p>QTD Total</p>
              <p>Status</p>
              <p>Data</p>
              <p>Valor</p>
            </div>
            {escolheCargo.length === 0 ? (
              filteredPedidos.length > 0 ? (
                filteredPedidos.map((pedido) => (
                  <div className={styles.itemPed} key={pedido.id}>
                    <p>{pedido.id}</p>
                    <p>{pedido.qtdeTotal}</p>
                    <p>{pedido.status}</p>
                    <p>{new Date(pedido.data).toLocaleDateString('pt-BR')}</p>
                    <p>{pedido.valorTotal}</p>
                  </div>
                ))
              ) : (
                <p>Nenhum pedido encontrado.</p>
              )
            ) : (
              <>
              {
                filteredPedidos.length > 0 ? (
                  filteredPedidos
                    .filter((pedido) => 
                      // Filtrar os pedidos que contém produtos com código correspondente ao cargo selecionado
                      pedido.produtos.some((produto) => 
                        filteredProducts.some((filteredProduto) => filteredProduto.codigo === produto.cod)
                      )
                    )
                    .map((pedidoProduto, index) => (
                      <div className={styles.itemPed} key={index}>
                        <p>{pedidoProduto.id}</p>
                        <p>{pedidoProduto.qtdeTotal}</p>
                        <p>{pedidoProduto.status}</p>
                        <p>{new Date(pedidoProduto.data).toLocaleDateString('pt-BR')}</p>
                        <p>{pedidoProduto.valorTotal}</p>
                      </div>
                    ))
                ) : (
                  <p>Nenhum pedido encontrado para o cargo selecionado.</p> 
                )
              }
            </>
            )}
          </div>
        </div>
   
      </form>
  );
};
