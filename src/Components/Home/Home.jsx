import React, { useState } from 'react'
import { useRef, useEffect } from 'react';
import gif from '../../assets/video garb.mp4'
import styles from './Home.module.css'
import LogoSVG from "../../assets/GARB SOLUTION - LOGOTIPO DEFINITIVO 1.svg?react"
import { GlobalContext } from '../../GlobalContext'; 
import { useContext } from 'react';
export const Home = () => {
    
    const {navigate,animacao,setAnimacao } = useContext(GlobalContext)



    const videoRef = useRef(null);

    useEffect(() => {
        
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.6; // Diminui a velocidade do vídeo pela metade
       
      }
    }, []);
 

function handleActiveHeroPage(){
    setAnimacao(true)
    setTimeout(()=>{
        navigate('/HeroPage')

    },2000)
}
    
  return (
    <div  onClick={handleActiveHeroPage} className={animacao?`${styles.manAnimation}` :`${styles.mainHome}`}>
        <video   ref={videoRef} autoPlay muted loop className={styles.videoContainer} >
                <source className={styles.HomeGIF} src={gif}type="video/mp4" />
            </video>
            <LogoSVG className={animacao ? `${styles.homelogo} ${styles.animacaoAtiva}` : styles.homelogo} />


    </div>
  )
}
