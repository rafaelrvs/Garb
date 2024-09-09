import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import './FullScreenDiv.css'; // Importa o CSS

const FullScreenDiv = () => {
  const { visible, setVisible } = useContext(GlobalContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false); // Para controlar a animação de saída

  useEffect(() => {
    let inactivityTimer;

    // Função para exibir a tela após um período de inatividade
    const handleInactivity = () => {
      inactivityTimer = setTimeout(() => {
        setIsAnimating(true); // Inicia a animação de entrada (div desce)
        setTimeout(() => {
          setVisible(true); // Torna o componente visível após a animação de entrada começar
        }, 100); // Pequeno atraso para a animação aparecer
      }, 5000); // 5 segundos de inatividade
    };

    // Função para resetar o timer e animar a saída quando ocorre um clique
    const resetInactivityTimer = () => {
      if (visible) {
        // Animação de saída quando a tela de descanso está visível
        setIsExiting(true); // Inicia a animação de saída
        setTimeout(() => {
          setVisible(false); // Oculta a tela de descanso ao final da animação
          setIsAnimating(false); // Remove a animação de entrada
          setIsExiting(false); // Finaliza a animação de saída
        }, 500); // Tempo de animação de saída
      }

      clearTimeout(inactivityTimer); // Limpa o timer de inatividade
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
  }, [visible, setVisible]);

  return (
    <video
      autoPlay
      muted
      loop
      className={`sleep-screen 
      ${isAnimating && !isExiting ? 'slideDown' : ''} 
      ${isExiting ? 'slideUp' : ''} 
      ${visible ? 'visible' : ''}`}
    >
      <source src="../../videos/video_garb.mp4"/>
    </video>
  );
};

export default FullScreenDiv;
