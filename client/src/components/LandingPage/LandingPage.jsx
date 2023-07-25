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
      <p className={styles.LandingParagraph}>¡Bienvenido a mi primera web! 
En este emocionante proyecto, te invito a explorar y descubrir información fascinante sobre los países de todo el mundo. Podrás sumergirte en un viaje virtual a través de continentes, donde encontrarás linformacion como: nombres, continentes, poblaciones, capitales, áreas y banderas de cada país. 
Además, podrás explorar las diferentes actividades que se pueden realizar en cada país, descubriendo las opciones de aventura, entretenimiento y diversión que te esperan. No importa si te gusta el senderismo, el buceo, la gastronomía o la historia, hay algo para cada gusto y preferencia. 
Así que prepárate para ampliar tus conocimientos y descubrir nuevas experiencias mientras exploras esta fascinante web. 
¡No te pierdas esta oportunidad única y disfruta de la variedad de actividades que puedes realizar en cada país en mi primera web!</p>
      <Link to={"/home"}>
        <button className={styles.LandingStart}>
          <span className={styles.LandingButton}>Empezar</span>
        </button>
      </Link>
    </section>
</div>
  )
}

