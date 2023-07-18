import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Detail (props){

    const {countries}=props
    const {ide}= useParams();
    const [detailCountry, setDetailCountry] = useState({});

    useEffect(() => {
      console.log(ide)
      console.log(countries)
      const foundCountry = countries.find(country=> country.ide===ide)
      setDetailCountry(foundCountry)
      console.log(foundCountry)
      },[ide,countries]);

    return (
      <section id='modal' className={styles.modal}>
          <div className={styles.modal__container}>
            <div className={styles.modal__imageContainer}>
              <h2 className={styles.modal__title}>{detailCountry.name}</h2>
              <img className={styles.modal__img} src={detailCountry.flagImage} alt="" />
              <h2 className={styles.modal__ide}>{detailCountry.ide}</h2>
            </div>
            <div className={styles.modal__informationContainer}>
                <h2 className={styles.modal__informationTitle}>INFORMACION:</h2>
                <h3 className={styles.modal__information}>Continente: {detailCountry.region}</h3>
                <h3 className={styles.modal__information}>Capital: {detailCountry.capital}</h3>
                <h3 className={styles.modal__information}>Sub Region: {detailCountry.subRegion}</h3>
                <h3 className={styles.modal__information}>Area: {detailCountry.area} m2</h3>
                <h3 className={styles.modal__information}>Poblacion: {detailCountry.population} hab</h3>
                <Link  strict to={`/home`}>
                  <a className={styles.modal__close} onClick={console.log('me hacen click')} >Volver al menu</a>
                </Link>
            </div>
          </div>
      </section>
      );

}