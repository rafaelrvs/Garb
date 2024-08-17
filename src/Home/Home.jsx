
import { useRef, useEffect } from 'react';
import LogoRoxo from '../Components/Logo';
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
            <video ref={videoRef} autoPlay muted loop className="background-video">
                <source src="./src/assets/video garb.mp4" type="video/mp4" />
            </video>
        </div>

    )
}
export default Home