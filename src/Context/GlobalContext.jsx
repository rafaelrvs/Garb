import { createContext, useEffect, useState } from "react";


export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  
  
  const [cargos, setCargos] = useState([])

  const [quantidade, setQuantidade] = useState(1);
  const [ativaImagem,setAtivaImagem] = useState(false)



  return (
    <GlobalContext.Provider
      value={{
        cargos, setCargos,
        quantidade, setQuantidade,
        ativaImagem,
        setAtivaImagem
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
