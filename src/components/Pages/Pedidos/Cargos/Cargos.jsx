import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Cargos.module.css';
import { empresas } from '../../../../DB/empresas';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import Produto from '../Produto/Produto';

const Cargos = () => {
  const navigate = useNavigate();
  const { cargos, setCargos } = useContext(GlobalContext);
  const [currentCargo, setCurrentCargo] = useState([]);
  const cargoRefs = useRef([]); // Usamos um array de referências

  useEffect(() => {
    const empId = window.localStorage.getItem('currentEmpresa');
    const empresa = empresas.filter((empresa) => empresa.id == empId);
    if (empresa.length) {
      setCargos(empresa[0].cargos);
    } else {
      navigate('/pedidos');
    }
  }, []);

  function abrirProdutos(id) {
    setCurrentCargo((prevCargo) => {
      if (prevCargo.includes(id)) {
        return prevCargo.filter((cargoId) => cargoId !== id);
      } else {
        return [...prevCargo, id];
      }
    });  
  }

  return (
    <div>
      <h3>Selecione o cargo disponível</h3>
      <div className={styles.lista}>
        {cargos.map((cargo, index) => (
          <div key={cargo.id} >
            <div className={styles.linha} ref={(el) => (cargoRefs.current[index] = el)} onClick={() => abrirProdutos(cargo.id)}>
              <div className={`${styles.qtdeCargo}`}>
                <p className={styles.text}>-</p>
              </div>
              <span className={styles.text}>{cargo.nome}</span>
            </div>
            {currentCargo.includes(cargo.id) && <Produto cargoID={cargo.id} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cargos;
