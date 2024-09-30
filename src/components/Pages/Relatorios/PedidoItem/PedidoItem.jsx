import React, { useContext, useState } from 'react';
import styles from './PedidoItem.module.css';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { empresas } from '../../../../DB/empresas';

export const PedidoItem = () => {
  const { pedidos } = useContext(GlobalContext);
  const [searchPedido, setSearchPedido] = useState('');
  const [escolheCargo, setEscolheCargo] = useState('');
  const [escolheStatus, setEscolheStatus] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [todosCodigo,setTodosCodigo] = useState([])

console.log(filteredPedidos);


  const todosCargos = empresas.flatMap((empresa) => empresa.cargos);

  const pediProd = pedidos.flatMap((pedido) => pedido.status);
  const pediProdUnico = [...new Set(pediProd)];
  const codigosProdutos = filteredPedidos.flatMap(pedido => 
    pedido.produtos.map(produto => produto.cod)
);

  

  // Função de busca e filtragem
  function handleClick(event) {
    event.preventDefault();

    const pedidosFiltrados = pedidos.filter((pedido) => {
      const filtroPedido = searchPedido ? pedido.id === Number(searchPedido) : true;
      const filtroCargo = escolheCargo ? pedido.cargo === escolheCargo : true;
      const filtroStatus = escolheStatus ? pedido.status === escolheStatus : true;
      const filtroData =
        dataInicio && dataFim
          ? new Date(pedido.dataEmissao) >= new Date(dataInicio) &&
          new Date(pedido.dataEmissao) <= new Date(dataFim)
          : true;

      return filtroPedido && filtroCargo && filtroStatus && filtroData;
    });

    setFilteredPedidos(pedidosFiltrados);
  }

  return (
    <div className={styles.containerForm}>
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

        <div className={styles.containerResultado}>
          <h3 className={styles.titleResult}>Resultado</h3>
          <div className={styles.fieldResult}>
            <table border="1" className={styles.table}>
              <thead>
                <tr className={styles.newTH}>
                  <th>ID</th>
                  <th>Codigo</th>
                  <th>Descrição</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredPedidos.length > 0 ? (
                  filteredPedidos.map((pedido, index) => (
                    <>
                    <tr key={index}>
                      <td>{pedido.id}</td>
                      <td>
                        {pedido.produtos.length > 0
                          ? pedido.produtos.map((produto, pIndex) => (
      
                            <tr className={styles.codProduto} key={pIndex}>{produto.cod}</tr>
                        

                    
                          ))
                          : 'Sem produtos'}
                      </td>
                      <td>
                        {pedido.produtos.length > 0
                          ? pedido.produtos.map((produto, pIndex) => (
                            <>
                            <div className={styles.descTable} key={pIndex}>{produto.descricao}</div>
                    
                            </>
                          ))
                          : 'Sem produtos'}
                      </td>
                      <td>{pedido.data}</td>
                    </tr>
                    
                  <tr className={styles.newTH}>
                    <th>ID</th>
                    <th>Codigo</th>
                    <th>Descrição</th>
                    <th>Data</th>
                  </tr>
                  </>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Nenhum pedido encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
};
