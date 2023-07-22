import React from "react";
import styles from './LandingPage.module.css';
import {Link} from 'react-router-dom';

export default function LandingPage(){
return(
  <div className={styles.LandingPage}>
    <header className={styles.LandingHeader}>
      <h1 className={styles.LandingTitle}>COUNTRIES</h1>
    </header>
    <section className={styles.LandingAbout}>
      <h2 className={styles.LandingSubtitle}>Acerca de</h2>
      <p className={styles.LandingParagraph}>Bienvenidos a nuestra página web, tu guía completa sobre todos los países del mundo. Descubre la diversidad cultural, geográfica e histórica de cada nación a través de información detallada y actualizada. Explora monumentos, maravillas naturales, tradiciones y costumbres únicas. Ya sea que estés planeando un viaje, investigando o ampliando tus conocimientos, nuestro sitio web es tu recurso confiable. Sumérgete en la belleza y la diversidad de nuestro planeta. ¡Bienvenido a nuestra web!</p>
      <Link to={"/home"}>
        <button className={styles.LandingStart}>
          <span className={styles.LandingButton}>Empezar</span>
        </button>
      </Link>
    </section>
</div>
  )
}

