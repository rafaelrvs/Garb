import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import './FullScreenDiv.css'; // Importa o CSS
import SVGLogoGarb from '../../images/Header/Logo_Garb.svg';
import videoSource from '../../videos/video_garb.mp4';

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
      }, 60000); // 1 segundo de inatividade
    };

    // Função para resetar o timer e animar a saída quando ocorre um clique ou scroll
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

    // Adiciona os eventos de clique e scroll na janela
    window.addEventListener('click', resetInactivityTimer);
    window.addEventListener('scroll', resetInactivityTimer);
    window.addEventListener('touchmove', resetInactivityTimer); // Detecta rolagem no desktop e no mobile

    // Inicia o temporizador de inatividade quando o componente é montado
    handleInactivity();

    // Limpa os eventos e o timer ao desmontar o componente
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
      window.removeEventListener('scroll', resetInactivityTimer);
      window.removeEventListener('touchmove', resetInactivityTimer);
    };
  }, [visible, setVisible]);

  return (
    <div
      className={`sleep-screen 
        ${isAnimating && !isExiting ? 'slideDown' : ''} 
        ${isExiting ? 'slideUp' : ''} 
        ${visible ? 'visible' : ''}`}
    >
      <video autoPlay muted loop className="video-screen">
        <source src={videoSource} type="video/mp4" />
      </video>
      <img src={SVGLogoGarb} alt="Logo Garb" className="logoScreen" />
    </div>
  );
};

export default FullScreenDiv;
