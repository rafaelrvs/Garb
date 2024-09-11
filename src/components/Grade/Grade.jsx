import React, { useContext } from 'react';
import styles from './Grade.module.css';
import { GlobalContext } from '../../Context/GlobalContext';


const Grade = ({ grade }) => {
  const { tamanhoSelecionado, setTamanhoSelecionado } = useContext(GlobalContext);

  // Função para lidar com a mudança de tamanho selecionado
  const handleSizeChange = (event) => {
    setTamanhoSelecionado(event.target.value); // Atualiza o tamanho selecionado no contexto global
  };

  return (
    <section className={styles.gradeContainer}>
      <select 
        className={styles.grade}
        value={tamanhoSelecionado} // Define o valor selecionado
        onChange={handleSizeChange} // Atualiza o tamanho quando o usuário seleciona uma nova opção
      >
        <option value="" disabled>Selecione um tamanho</option> {/* Opção padrão */}
        {grade.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </section>
  );
};

export default Grade;
