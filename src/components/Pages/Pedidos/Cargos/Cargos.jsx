import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Cargos.module.css';
import { empresas } from '../../../../DB/empresas';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import Produto from '../Produto/Produto';
import Voltar from '../../../Voltar/Voltar'

const Cargos = () => {
  const navigate = useNavigate();
  const { cargos, setCargos } = useContext(GlobalContext);
  const [currentCargo, setCurrentCargo] = useState([]);

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
      <Voltar/>
      <h3>Selecione o cargo disponível</h3>
      <div className={`${styles.lista} animeLeft`}>
        {cargos.map((cargo) => (
          <div key={cargo.id} >
            <div className={styles.linha} onClick={() => abrirProdutos(cargo.id)}>
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
