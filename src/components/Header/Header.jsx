import React, { useContext, useEffect, useState } from 'react'
import styles from './Header.module.css'
import SVGLogoGarb from '../../../public/images/Header/Logo_Garb.svg'
import SVGLogoCli from '../../../public/images/Header/Logo_Cli.svg'

import InicarPedido from '../../../public/images/Header/nav/InicarPedido.svg'
import InicarPedidoActive from '../../../public/images/Header/nav/active/InicarPedidoActive.svg'

import TrocaEDevolucao from '../../../public/images/Header/nav/TrocaEDevolucao.svg'
import TrocaEDevolucaoActive from '../../../public/images/Header/nav/active/TrocaEDevolucaoActive.svg'

import Chamado from '../../../public/images/Header/nav/Chamado.svg'
import ChamadoActive from '../../../public/images/Header/nav/active/ChamadoActive.svg'

import Relatorio from '../../../public/images/Header/nav/Relatorio.svg'
import RelatorioActive from '../../../public/images/Header/nav/active/RelatorioActive.svg'
import { Link, NavLink, useLocation } from 'react-router-dom'
import PopUp from '../PopUp/PopUp'
import { GlobalContext } from '../../Context/GlobalContext'
import FullScreenDiv from '../FullScreenDiv/FullScreenDiv'
import { Modal } from '../Modal/Modal'
import Voltar from '../Voltar/Voltar'
import ModalTroca from '../ModalTroca/ModalTroca'



const Header = () => {
    const [btnAtivo, setBtnAtivo] = useState('')
    const {popUp, modalTroca, modal} = useContext(GlobalContext);
    const location = useLocation();

    useEffect(()=>{
        
        const btn = window.localStorage.getItem('btnAtivo')
        setBtnAtivo(btn)
    },[])

    useEffect(() => {
        // Verifica se a rota atual é a raiz
        if (location.pathname === '/') {
            setBtnAtivo('')
            window.localStorage.removeItem('btnAtivo')
        }
      }, [location]);

    function ativaBtn(btn){
        window.localStorage.setItem('btnAtivo',btn)
        setBtnAtivo(btn)
    }

  return (
    <header>
        <div className={styles.containerLogos}>
            <div className={styles.logos}>
                <img src={SVGLogoCli} alt="logo Cli" className={styles.logoImg} />
                <Link to={'/'}><img src={SVGLogoGarb} alt="logo Garb" className={styles.logoImg}/></Link>
            </div>
        </div>
      <nav className={styles.nav}>
        <NavLink to={'/pedidos'} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn} onClick={()=>ativaBtn('1')}>
            <img src={btnAtivo==='1'? InicarPedidoActive : InicarPedido} className={styles.imgBtn}/>
        </NavLink>
        <NavLink to={'/trocas'} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn} onClick={()=>ativaBtn('2')}>
            <img src={btnAtivo==='2'? TrocaEDevolucaoActive : TrocaEDevolucao} className={styles.imgBtn}/>
        </NavLink>
        <NavLink to={'/chamados'} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn} onClick={()=>ativaBtn('3')}>
            <img src={btnAtivo ==='3'?ChamadoActive: Chamado} className={styles.imgBtn}/>
        </NavLink>
        <NavLink to={'/relatorios'} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn} onClick={()=> ativaBtn('4')}>
            <img src={btnAtivo==='4'?RelatorioActive : Relatorio} className={styles.imgBtn}/>
        </NavLink>
      </nav>
      <PopUp status={popUp.status} color={popUp.color}>{popUp.children}</PopUp>
  
      {modal &&<Modal  />}
      {modalTroca.status&& <ModalTroca pedido={modalTroca.pedido}/>}

      <FullScreenDiv/>
    
    </header>
  )
}

export default Header
