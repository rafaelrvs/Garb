import { createContext, useEffect, useState } from "react";


export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  
  
  const [cargos, setCargos] = useState([])

  return (
    <GlobalContext.Provider
      value={{
        cargos, setCargos,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
