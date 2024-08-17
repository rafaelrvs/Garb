
import { useRef, useEffect } from 'react';

import gif from '../assets/video garb.mp4'
import './Home.css'
import LogoRoxo from '../Components/Logo/Logo';
const Home = ({animacao}) => {
    
    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.4; // Diminui a velocidade do vídeo pela metade
      }
    }, []);

    return (
        <div className='home'>
            <LogoRoxo animacao={animacao}/>
            <video ref={videoRef} autoPlay muted loop className="background-video" id={animacao?"efeitoSaidaVIdeo" :""}>
                <source src={gif}type="video/mp4" />
            </video>
        </div>

    )
}
export default Home