
import "./Logo.css"
const LogoRoxo =({animacao})=>{
    return(
    <img className="logoRoxo" id={animacao?"animacaoAtiva":""} src="src\assets\GARB SOLUTION - LOGOTIPO DEFINITIVO 1.svg" />
    )
}
export default LogoRoxo