import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  
  const [cargos, setCargos] = useState([]);

  // Carrega a quantidade do localStorage, ou define 1 se não estiver definido
  const [quantidade, setQuantidade] = useState(() => {
    const savedQuantidade = window.localStorage.getItem("quantidade");
    return savedQuantidade !== null ? JSON.parse(savedQuantidade) : 1;
  });

  const [ativaImagem, setAtivaImagem] = useState(false);

  // Carrega o carrinho do localStorage, ou define 0 se não estiver definido
  const [carrinho, setCarrinho] = useState(() => {
    const savedCarrinho = window.localStorage.getItem("carrinho");
    return savedCarrinho !== null ? JSON.parse(savedCarrinho) : 0;
  });

  // Salva a quantidade no localStorage sempre que mudar
  useEffect(() => {
    window.localStorage.setItem("quantidade", JSON.stringify(quantidade));
  }, [quantidade]);

  // Salva o carrinho no localStorage sempre que mudar
  useEffect(() => {
    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  return (
    <GlobalContext.Provider
      value={{
        cargos, setCargos,
        quantidade, setQuantidade,
        ativaImagem, setAtivaImagem,
        carrinho, setCarrinho,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
