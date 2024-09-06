import { createContext, useEffect, useState } from "react";


export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  
  
  const [cargos, setCargos] = useState([])

  const [quantidade, setQuantidade] = useState(1);



  return (
    <GlobalContext.Provider
      value={{
        cargos, setCargos,
        quantidade, setQuantidade
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
