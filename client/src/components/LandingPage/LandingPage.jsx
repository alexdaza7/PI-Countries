import React from "react";
import styles from './LandingPage.module.css';
import {Link} from 'react-router-dom';

export default function LandingPage(){
return(
  <div className={styles.paragraph}>
      <h1>DESCUBRE PAISES Y ACTIVIDADES</h1>
      <p>Explora una dase de datos con información sobre todos los paises del mundo y disfruta de todas pas actividades que puedes hacer en ellos</p>
      <Link to={"/home"}>
        <button>ACCEDER</button>
      </Link>
  </div>
    )
}