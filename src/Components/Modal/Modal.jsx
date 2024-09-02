import React, { useContext } from 'react'
import styles from './Modal.module.css'
import ClosePage  from '../../assets/closePage.svg?react'
import PedirPorCargo from '../PedirPorCargo/PedirPorCargo'
import { GlobalContext } from '../../GlobalContext'

const Modal = ({content ,setActiveIcon}) => {

  

  function handleClosePage(){
    setActiveIcon("")
  

  }



  return (
    <div className={styles.Modal}>
      <div className={styles.containerClosePage}>

       <ClosePage className={styles.closePage} onClick={handleClosePage}/>
      </div>

      {content ==="cartao"?  <PedirPorCargo/> :"" }
   
    </div>
  )
}

export default Modal
