import React from 'react'
import styles from "./HeroPage.module.css"
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { HeaderGarb } from './HeaderGarb'
import { ContentMain } from './ContentMain'
export const HeroPage = () => {
  return (
    <section className={styles.contentHeroPage} >
    
            <HeaderGarb/>
            <ContentMain/>
            



    </section>
  )
}



