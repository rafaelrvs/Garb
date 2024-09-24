import React, { useContext, useRef } from 'react'
import styles from './ModalTroca.module.css';
import { GlobalContext } from '../../Context/GlobalContext';

const ModalTroca = ({pedido}) => {


const { setModalTroca } = useContext(GlobalContext);
const voltar = useRef()
function closeModal(event){
    console.log(event.currentTarget);
    console.log(voltar.current)
    if(event.currentTarget === voltar.current){
        setModalTroca({
            status:false,
            pedido:'',
        })
    }
}

  return (
    <div className={styles.containerModal}>
        <div className={`${styles.modal}  ${styles.fade}`} >
            <div className={styles.voltarContainer} onClick={closeModal} ref={voltar}>
                <p className={styles.voltarBtn}>{'<'}</p>     
            </div>
            <p>{pedido}</p>
        </div>
    </div>
  )
}

export default ModalTroca
