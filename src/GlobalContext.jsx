import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [login, setLogin] = useState(null);
    const [loading, setLoading] = useState(false);
    const [animacao, setAnimacao] = useState(false);
    const [downtime, setDownTime] = useState(false);
    const navigate = useNavigate();


    useEffect(()=>{
        setAnimacao(false)
       
    },[])

    useEffect(()=>{
        // setTimeout(()=>{
        //     console.log("teste");
            
        //     navigate("/")
        //     setAnimacao(false)
        // },15000)
   
     
       
    },[animacao])






    

    return (
        <GlobalContext.Provider value={{ login, setLogin, loading, setLoading, navigate, animacao, setAnimacao,setDownTime,downtime }}>
            {children}
        </GlobalContext.Provider>
    );
};
