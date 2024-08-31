import React from 'react'
import styles from './Modal.module.css'
import ClosePage  from '../assets/closePage.svg?react'

const Modal = ({content}) => {
  return (
    <div className={styles.Modal}>
       <ClosePage className={styles.closePage}/>
        {content}
    </div>
  )
}

export default Modal
