import React, { useContext, useEffect, useState } from 'react'
import styles from './Header.module.css'
import SVGLogoGarb from '/images/Header/Logo_Garb.svg'
import SVGLogoCli from '/images/Header/Logo_Cli.svg'

import InicarPedido from '/images/Header/nav/InicarPedido.svg'
import InicarPedidoActive from '/images/Header/nav/active/InicarPedidoActive.svg'

import TrocaEDevolucao from '/images/Header/nav/TrocaEDevolucao.svg'
import TrocaEDevolucaoActive from '/images/Header/nav/active/TrocaEDevolucaoActive.svg'

import Chamado from '/images/Header/nav/Chamado.svg'
import ChamadoActive from '/images/Header/nav/active/ChamadoActive.svg'

import Relatorio from '/images/Header/nav/Relatorio.svg'
import RelatorioActive from '/images/Header/nav/active/RelatorioActive.svg'
import { Link, NavLink, useLocation } from 'react-router-dom'
import PopUp from '../PopUp/PopUp'
import { GlobalContext } from '../../Context/GlobalContext'
import FullScreenDiv from '../FullScreenDiv/FullScreenDiv'
import { Modal } from '../Modal/Modal'
import ModalTroca from '../ModalTroca/ModalTroca'
import ModalRelatorio from '../ModalTroca/ModalRelatorio/ModalRelatorio'



const Header = () => {
    const [btnAtivo, setBtnAtivo] = useState('')
    const {popUp, modalTroca, modal,modalRelatorio} = useContext(GlobalContext);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        switch(path){
            case '/':
                setBtnAtivo('')
                window.localStorage.removeItem('btnAtivo')
                break;
            case '/trocas':
                setBtnAtivo('2')
                break;
            case '/pedidos':
                setBtnAtivo('1')
                break;
            case '/chamados':
                setBtnAtivo('3')
                break;
            case '/relatorios':
                setBtnAtivo('4')
                break;
        }
      }, [location]);

      
  return (
    <header>
        <div className={styles.containerLogos}>
            <div className={styles.logos}>
                <img src={SVGLogoCli} alt="logo Cli" className={styles.logoImg} />
                <Link to={'/'}><img src={SVGLogoGarb} alt="logo Garb" className={styles.logoImg} /></Link>
            </div>
        </div>
      <nav className={styles.nav}>
        <NavLink to={'/pedidos'} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn} >
            <img src={btnAtivo==='1'? InicarPedidoActive : InicarPedido} className={styles.imgBtn}/>
        </NavLink>
        <NavLink to={'/trocas'} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn} >
            <img src={btnAtivo==='2'? TrocaEDevolucaoActive : TrocaEDevolucao} className={styles.imgBtn}/>
        </NavLink>
        <NavLink to={'/chamados'} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn} >
            <img src={btnAtivo ==='3'?ChamadoActive: Chamado} className={styles.imgBtn}/>
        </NavLink>
        <NavLink to={'/relatorios'} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn}>
            <img src={btnAtivo==='4'?RelatorioActive : Relatorio} className={styles.imgBtn}/>
        </NavLink>
      </nav>
      <PopUp status={popUp.status} color={popUp.color}>{popUp.children}</PopUp>
  
      {modal &&<Modal  />}
      {modalTroca.status&& <ModalTroca pedido={modalTroca.pedido}/>}
      {modalRelatorio.status&& <ModalRelatorio solicitacao={modalRelatorio.solicitacao}/>}

      <FullScreenDiv/>
    
    </header>
  )
}

export default Header
