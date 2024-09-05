import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import SVGLogoGarb from '../../images/Header/Logo_Garb.svg'
import SVGLogoCli from '../../images/Header/Logo_Cli.svg'

import InicarPedido from '../../images/Header/nav/InicarPedido.svg'
import InicarPedidoActive from '../../images/Header/nav/active/InicarPedidoActive.svg'

import TrocaEDevolucao from '../../images/Header/nav/TrocaEDevolucao.svg'
import TrocaEDevolucaoActive from '../../images/Header/nav/active/TrocaEDevolucaoActive.svg'

import Chamado from '../../images/Header/nav/Chamado.svg'
import ChamadoActive from '../../images/Header/nav/active/ChamadoActive.svg'

import Relatorio from '../../images/Header/nav/Relatorio.svg'
import RelatorioActive from '../../images/Header/nav/active/RelatorioActive.svg'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    const [btnAtivo, setBtnAtivo] = useState('')

    useEffect(()=>{
        const btn = window.localStorage.getItem('btnAtivo')
        setBtnAtivo(btn)
    },[])

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
    </header>
  )
}

export default Header