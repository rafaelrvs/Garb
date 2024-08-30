import React, { useState } from 'react';
import CartaoSVG from '../assets/card.svg?react';
import CardBrancoSVG from '../assets/cardBranco.svg?react';
import SetaSVG from '../assets/seta2.svg?react';
import SetaSVG1 from '../assets/seta3.svg?react';
import HeadphoneSVG from '../assets/headphone.svg?react';
import Inventario from '../assets/inventario.svg?react';
import styles from "./ContentMain.module.css";

export const ContentMain = () => {
  const [activeIcon, setActiveIcon] = useState(null);

  const handleSelection = (item) => {
    setActiveIcon(item);
  };

  return (
    <main className={styles.Main}>
      <div className={styles.menuModal}>
        <div onClick={() => handleSelection('cartao')}className={activeIcon === 'cartao' ? styles.iconMainsvg2:""} >
          {activeIcon === 'cartao' ? <CardBrancoSVG className={styles.iconMainsvg2} /> : <CartaoSVG className={styles.iconMainsvg} />}
        </div>
        <div onClick={() => handleSelection('seta')} className={activeIcon === 'seta' ? styles.iconMainsvg2:""} >
          {activeIcon === 'seta' ? <SetaSVG className={styles.iconMainsvg2} /> : <SetaSVG className={styles.iconMainsvg} />}
        </div>
        <div onClick={() => handleSelection('phone')} className={activeIcon === 'phone' ? styles.iconMainsvg2:""} >
          {activeIcon === 'phone' ? <HeadphoneSVG className={styles.iconMainsvg2} /> : <HeadphoneSVG className={styles.iconMainsvg} />}
        </div>
        <div onClick={() => handleSelection('inventario')} className={activeIcon === 'inventario' ?styles.iconMainsvg2:""}>
          {activeIcon === 'inventario' ? <Inventario className={styles.iconMainsvg2} /> : <Inventario className={styles.iconMainsvg} />}
        </div>
      </div>
    </main>
  );
};
