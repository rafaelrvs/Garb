
import { useRef, useEffect } from 'react';
import LogoRoxo from '../Components/Logo';
const Home = () => {
    
    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.5; // Diminui a velocidade do vídeo pela metade
      }
    }, []);
    return (
        <div>
            <LogoRoxo/>
            <video ref={videoRef} autoPlay muted loop className="background-video">
                <source src="./src/assets/Vídeo do WhatsApp de 2024-08-16 à(s) 15.19.22_a88e0d84.mp4" type="video/mp4" />
            </video>
        </div>

    )
}
export default Home