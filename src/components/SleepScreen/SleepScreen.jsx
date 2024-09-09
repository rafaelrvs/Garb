import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';

const FullScreenDiv = () => {
  const { visible, setVisible } = useContext(GlobalContext);

  useEffect(() => {
    let inactivityTimer;

    // Função para exibir a tela após um período de inatividade
    const handleInactivity = () => {
      inactivityTimer = setTimeout(() => {
        setVisible(true); // Mostra a tela após o tempo de inatividade
      }, 1000); // 5 segundos de inatividade
    };

    // Função para resetar o timer quando ocorre um clique
    const resetInactivityTimer = () => {
      setVisible(false); // Oculta a tela de descanso ao clicar
      clearTimeout(inactivityTimer); // Limpa o timer
      handleInactivity(); // Reinicia o timer para contar novamente
    };

    // Adiciona o evento de clique na janela
    window.addEventListener('click', resetInactivityTimer);

    // Inicia o temporizador de inatividade quando o componente é montado
    handleInactivity();

    // Limpa os eventos e o timer ao desmontar o componente
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
    };
  }, [setVisible]);

  // Retorna nulo se o estado `visible` for falso (div não aparece)
  if (!visible) return null;

  return (
    <div style={styles.fullScreenDiv}>
      {/* Conteúdo da tela de descanso */}
      <h1>Screen Saver</h1>
    </div>
  );
};

const styles = {
  fullScreenDiv: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fundo escuro com opacidade
    zIndex: 9999, // Alta prioridade para estar na frente de todos os elementos
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '2rem',
  },
};

export default FullScreenDiv;
