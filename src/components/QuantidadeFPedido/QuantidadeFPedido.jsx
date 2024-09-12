import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import styles from './QuantidadeFPedido.module.css';

const QuantidadeFPedido = ({ productId, currentQtde, tamanho }) => {
  const { quantidades, updateQuantidade } = useContext(GlobalContext);
  const [quantidade, setQuantidade] = useState(currentQtde);

  useEffect(() => {
    setQuantidade(currentQtde);
  }, [currentQtde]);

  useEffect(() => {
    if (quantidades[`${productId}-${tamanho}`] !== undefined) {
      setQuantidade(quantidades[`${productId}-${tamanho}`]);
    }
  }, [quantidades, productId, tamanho]);

  const incrementar = () => {
    updateQuantidade(productId, tamanho, quantidade + 1);
  };

  const decrementar = () => {
    if (quantidade > 1) {
      updateQuantidade(productId, tamanho, quantidade - 1);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^[1-9]\d*$/.test(value) || value === '') {
      updateQuantidade(productId, tamanho, value === '' ? '' : parseInt(value, 10));
    }
  };

  return (
    <div className={styles.quantidadeContainer}>
      <button onClick={decrementar} className={styles.quantidadeButton}>-</button>
      <input className={styles.quantidadeNumber} type="text" value={quantidade} onChange={handleChange} />
      <button onClick={incrementar} className={styles.quantidadeButton}>+</button>
    </div>
  );
};

export default QuantidadeFPedido;
