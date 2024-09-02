import React from 'react'
import styles from './HeaderGarb.module.css'
import EmpresaSVG  from '../../assets/Group.svg?react'
import LogoGarbSVG  from '../../assets/GARB SOLUTION - LOGOTIPO DEFINITIVO 1.svg?react'
export const HeaderGarb = () => {
  return (
    <header className={styles.header}>
      <EmpresaSVG className={styles.logoEmpresaParceira}/>
      <LogoGarbSVG className={styles.logoGarbHeader}/>
    </header>
  )
}
