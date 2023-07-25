import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {useSelector } from "react-redux";

export default function Detail (){

    const {ide}= useParams();
    const [detailCountry, setDetailCountry] = useState({});
    const countries = useSelector(state=>state.countries);

    useEffect(() => {
      const foundCountry = countries.find(country=> country.ide===ide)
      setDetailCountry(foundCountry)
      },[ide,countries]);

    return (
      <section id='modal' className={styles.modal}>
          <div className={styles.modalContainer}>
            <div className={styles.modalImageContainer}>
              <h2 className={styles.modalTitle}>{detailCountry.name}</h2>
              <img className={styles.modalImg} src={detailCountry.flagImage} alt="Imagen de la bandera del pais" />
              <h2 className={styles.modalIde}>{detailCountry.ide}</h2>
            </div>
            <div className={styles.modalInformationContainer}>
                <div>
                  <h2 className={styles.modalInformationTitle}>INFORMACION:</h2>
                  <h3 className={styles.modalInformation}>Continente: {detailCountry.region}</h3>
                  <h3 className={styles.modalInformation}>Capital: {detailCountry.capital}</h3>
                  <h3 className={styles.modalInformation}>Sub Region: {detailCountry.subregion}</h3>
                  <h3 className={styles.modalInformation}>Area: {detailCountry.area} m2</h3>
                  <h3 className={styles.modalInformation}>Poblacion: {detailCountry.population} hab</h3>
                </div>
                <Link  strict to={`/home`}>
                  <button className={styles.modalCloseContainer} >
                    <span className={styles.modalClose} >Volver al menu</span>
                  </button>
                </Link>
            </div>
          </div>
      </section>
      );

}