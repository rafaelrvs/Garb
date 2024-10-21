import React, { useContext, useEffect, useState } from 'react'
import styles from './Header.module.css'
import SVGLogoGarb from '/images/Header/Logo_Garb.svg'
import LOGOAMALFIS from '/images/Header/LOGO-AMALFIS-Branco.svg'

//
import LOGOCASASBAHIAWHITE from '/images/Header/logoCli/casasbahiaWhite.svg'
import LOGOCBREWHITE from '/images/Header/logoCli/cbreWhite.svg'
import LOGOCLARO from '/images/Header/logoCli/LOGOCLARO.svg'
import logoVivoBranco from '/images/Header/logoCli/logoVivoBranco.svg'
import logoAnacBranco from '/images/Header/logoCli/logoAnacBranco.svg'


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
    const [logoCli, setLogoCli] = useState(null)
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
            case '/pedidos/carrinho':
                setBtnAtivo('1')
                break;
            case '/pedidos/AcompanharPedidos':
                setBtnAtivo('1')
                break;
            case '/chamados':
                setBtnAtivo('3')
                break;
            case '/relatorios':
                setBtnAtivo('4')
                break;
        }

        switch(path){
            case '/pedidos/1':
                setLogoCli('1')
                break;
            case '/pedidos/2':
                setLogoCli('2')
                break;
            case '/pedidos/3':
                setLogoCli('3')
                break;
            case '/pedidos/4':
                setLogoCli('4')
                break;
            case '/pedidos/5':
                setLogoCli('5')
                break;
            case '/pedidos/6':
                setLogoCli('6')
                break;
            default:
                setLogoCli(null)
                break;

        }
      }, [location]);

  return (
    <header>
        <div className={styles.containerLogos}>
            <div className={styles.logos}>
            {logoCli === null&&<img src={LOGOAMALFIS} alt="logo Cli" className={`${styles.logoImg} animeDown`} />}
            {logoCli === '1' &&<img src={LOGOCASASBAHIAWHITE} alt="logo Cli" className={`${styles.logoImg} animeDown`} />}
            {logoCli === '2' &&<img src={LOGOCBREWHITE} alt="logo Cli" className={`${styles.logoImg} animeDown`} />}
            {logoCli === '3' &&<img src={LOGOCLARO} alt="logo Cli" className={`${styles.logoImg} animeDown`} />}
            {logoCli === '4' &&<img src={logoVivoBranco} alt="logo Cli" className={`${styles.logoImg} animeDown`} />}
            {logoCli === '5' &&<img src={logoVivoBranco} alt="logo Cli" className={`${styles.logoImg} animeDown`} />}
            {logoCli === '6' &&<img src={logoAnacBranco} alt="logo Cli" className={`${styles.logoImg} animeDown`} />}
            
                <Link to={'/'}><img src={SVGLogoGarb} alt="logo Garb" className={`${styles.logoImg} animeDown`} /></Link>
            </div>
        </div>
      <nav className={styles.nav}>
        <NavLink to={'/pedidos'} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn} >
            <img src={btnAtivo==='1'? InicarPedidoActive : InicarPedido} className={styles.imgBtn}/>
            <p>Pedidos</p>
        </NavLink>
        <NavLink to={'/trocas'} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn} >
            <img src={btnAtivo==='2'? TrocaEDevolucaoActive : TrocaEDevolucao} className={styles.imgBtn}/>
            <p>Trocas</p>
        </NavLink>
        <NavLink to={'/chamados'} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn} >
            <img src={btnAtivo ==='3'?ChamadoActive: Chamado} className={styles.imgBtn}/>
            <p>Suporte</p>
        </NavLink>
        <NavLink to={'/relatorios'} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn}>
            <img src={btnAtivo==='4'?RelatorioActive : Relatorio} className={styles.imgBtn}/>
            <p>Relatórios</p>
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
