import React from 'react'
import styles from './Empresa.module.css'
import { empresas } from '../../../../DB/empresas'
import { useNavigate } from 'react-router-dom'
import Voltar from '../../../Voltar/Voltar'
import CasasBahia from '/images/empresas/CasasBahia.svg'
import Anac from '/images/empresas/anac.svg'
import Cbre from '/images/empresas/cbre.svg'
import Vivo from '/images/empresas/vivo.svg'
import Claro from '/images/empresas/claro.svg'
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
                <div className={styles.containerLogo}>

                  {empresa.id ===1&& <img src={CasasBahia} alt="logo" className={styles.logo}/>}
                  {empresa.id ===2&& <img src={Cbre} alt="logo" className={styles.logo}/>}
                  {empresa.id ===3&& <img src={Claro} alt="logo" className={styles.logo}/>}
                  {empresa.id ===4&& <img src={Vivo} alt="logo" className={styles.logo}/>}
                  {empresa.id ===5&& <img src={Vivo} alt="logo" className={styles.logo}/>}
                  {empresa.id ===6&& <img src={Anac} alt="logo" className={styles.logo}/>}
                </div>
              </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Empresa
