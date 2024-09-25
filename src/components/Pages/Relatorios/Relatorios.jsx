import React, { useContext, useRef, useState } from 'react'
import styles from './Relatorios.module.css'
import { GlobalContext } from '../../../Context/GlobalContext';
import { FormRelatorio } from './FormRelatorio/FormRelatorio';


const Relatorios = () => {
  const { setModal, pedidos, valueModal } = useContext(GlobalContext);
  const [relatorioSelecionado, setRelatorioSelecionado] = useState("")

function selectRelatorio(e){
   setRelatorioSelecionado(e.target.id);
  
  

}
  return (
    <div className={styles.container}>
      <section className={styles.containerWrapper}>
        <div className={styles.headerRelatorios}>
          <h1>Relatorios</h1>
        </div>

          <main className={styles.containerContent}>

          <div className={styles.relatorios} onClick={selectRelatorio}>
              <p className={styles.itemRelatorio} id="Pedido macro">Pedido macro</p>
              <p className={styles.itemRelatorio} id="Pedido por item">Pedido por item</p>
              <p className={styles.itemRelatorio} id="Tracking de pedidos" >Tracking de pedidos</p>
      
          </div>
            <div className={styles.containerRelatorio}> 
              <h2 className={styles.titleRelatorio}>{relatorioSelecionado}</h2>
              <FormRelatorio/>
            </div>

          </main>

      </section>

    </div>
  )
}

export default Relatorios
