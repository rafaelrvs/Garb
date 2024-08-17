
import "./Logo.css"
import logotipo from '../../assets/GARB SOLUTION - LOGOTIPO DEFINITIVO 1.svg'
const LogoRoxo =({animacao})=>{
    return(
    <img className="logoRoxo" id={animacao?"animacaoAtiva":""} src={logotipo} />
    )
}
export default LogoRoxo