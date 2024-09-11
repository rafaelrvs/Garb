import { createContext, useEffect, useRef, useState } from "react";

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  
  const [cargos, setCargos] = useState([]);
  const [quantidade, setQuantidade] = useState(() => {
    const savedQuantidade = window.localStorage.getItem("quantidade");
    return savedQuantidade !== null ? JSON.parse(savedQuantidade) : 1;
  });

  const [popUp, setPopUp] =useState({
    status:false,
    color: "",
    children: ""
  })
  const popupTimeoutRef = useRef(null);

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

  // console.log(carrinho);

  const [visible, setVisible] = useState(true);

  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('');


  return (
    <GlobalContext.Provider
      value={{
        cargos, setCargos,
        carrinho, setCarrinho,
        quantidade,setQuantidade,
        popUp, setPopUp,
        popupTimeoutRef,
        visible, setVisible,
        tamanhoSelecionado, setTamanhoSelecionado
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
