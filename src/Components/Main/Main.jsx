import React from 'react'
import "./Main.css"


const Main = () => {
  return (
    <main className='main'>
      <div className='container1-garb'>
        <p className='main-paragrafo-boas-vindas'>Seja Bem-Vindo ao Portal Garb!

          Aqui você pode acessar informações importantes e recursos exclusivos.

          Se você é novo por aqui ou precisa de mais informações, recomendamos que explore as Abas acima para conhecer melhor o nosso Portal. Você encontrará detalhes sobre nossos serviços, políticas e muito mais.

          Se você já é um usuário familiarizado, vá em frente e faça o seu Login para acessar sua conta.</p>
     
          <form>
  <div class="input-container">
    <input id="mail" type="text" required />
    <label id="lbmail" htmlFor="mail">Email</label>
  </div>
  
  <div class="input-container">
    <input id="password" type="text" required />
    <label id="lbpassowed" htmlFor="password">Senha</label>
  </div>
  
  <button className="btn-home">Entrar</button>
</form>


      </div>
    </main>
  )
}

export default Main
