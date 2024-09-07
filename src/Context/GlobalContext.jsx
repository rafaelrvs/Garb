import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  
  const [cargos, setCargos] = useState([]);
  const [ativaImagem, setAtivaImagem] = useState(false);
  const [quantidade, setQuantidade] = useState(() => {
    const savedQuantidade = window.localStorage.getItem("quantidade");
    return savedQuantidade !== null ? JSON.parse(savedQuantidade) : 1;
  });



  useEffect(() => {
    window.localStorage.setItem("quantidade", JSON.stringify(quantidade));
  }, [quantidade]);
  
  // Carrega o carrinho do localStorage, ou define como um array vazio se não estiver definido

  const [carrinho, setCarrinho] = useState(() => {
    const savedCarrinho = window.localStorage.getItem("carrinho");
    return savedCarrinho ? JSON.parse(savedCarrinho) : [];
  });




  useEffect(() => {
    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  console.log(carrinho);

  return (
    <GlobalContext.Provider
      value={{
        cargos, setCargos,
        ativaImagem, setAtivaImagem,
        carrinho, setCarrinho,
        quantidade,setQuantidade
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
