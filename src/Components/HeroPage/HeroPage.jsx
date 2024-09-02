import React from 'react'
import styles from "./HeroPage.module.css"
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { ContentMain } from '../ContentMain/ContentMain'
import { HeaderGarb } from '../Header/HeaderGarb'

export const HeroPage = () => {
  return (
    <section className={styles.contentHeroPage} >
    
            <HeaderGarb/>
          
            <ContentMain/>
            



    </section>
  )
}



