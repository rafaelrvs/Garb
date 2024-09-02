import React, { useContext } from 'react'
import styles from './Modal.module.css'
import ClosePage  from '../assets/closePage.svg?react'
import PedirPorCargo from './PedirPorCargo'
import { GlobalContext } from '../GlobalContext'

const Modal = ({content ,setActiveIcon}) => {

  

  function handleClosePage(){
    setActiveIcon("")
  

  }



  return (
    <div className={styles.Modal}>
   
       <ClosePage className={styles.closePage} onClick={handleClosePage}/>

      {content ==="cartao"?  <PedirPorCargo/> :"" }
   
    </div>
  )
}

export default Modal
