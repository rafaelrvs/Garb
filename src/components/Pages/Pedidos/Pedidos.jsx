import React from 'react'
import styles from './Pedidos.module.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Empresa from './Empresa/Empresa'
import Cargos from './Cargos/Cargos'
const Pedidos = () => {




  return (
    <section className={styles.container}>
      <h1>Pedidos</h1>
      <br />
      <Routes>
        <Route path='/' element={<Empresa/>}/>
        <Route path={`/:id`} element={<Cargos/>} />
      </Routes>
      
    </section>
  )
}

export default Pedidos
