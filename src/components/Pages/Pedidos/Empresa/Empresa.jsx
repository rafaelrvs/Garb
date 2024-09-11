import React from 'react'
import styles from './Empresa.module.css'
import { empresas } from '../../../../DB/empresas'
import { useNavigate } from 'react-router-dom'
import Voltar from '../../../Voltar/Voltar'

const Empresa = () => {
    const navigate = useNavigate()
  
    function abrirEmp(empId){
      navigate(`${empId}`)
      window.localStorage.setItem('currentEmpresa',empId)
    }
  return (
    <div>
        <Voltar/>
        <h3 className={styles.descricaoPage}>Para qual empresa deseja solicitar mais uniformes?</h3>
        <div className={`${styles.lista} animeLeft`}>
        {empresas.map((empresa)=>(
            <div key={empresa.id}>
              <div className={styles.linha} to={`${empresa.id}`} onClick={()=>abrirEmp(empresa.id)}>
                <div className={`${styles.qtdeCargo}`}><p className={styles.text}>{empresa.cargos.length}</p></div>
                <span className={`${styles.text}  ${styles.nomeText}`}>{empresa.nome}</span>
                <span className={styles.text}>CNPJ: {empresa.cnpj}</span>
              </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Empresa
