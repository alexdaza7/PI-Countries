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
          <div className={styles.modal__container}>
            <div className={styles.modal__imageContainer}>
              <h2 className={styles.modal__title}>{detailCountry.name}</h2>
              <img className={styles.modal__img} src={detailCountry.flagImage} alt="" />
              <h2 className={styles.modal__ide}>{detailCountry.ide}</h2>
            </div>
            <div className={styles.modal__informationContainer}>
                <div>
                  <h2 className={styles.modal__informationTitle}>INFORMACION:</h2>
                  <h3 className={styles.modal__information}>Continente: {detailCountry.region}</h3>
                  <h3 className={styles.modal__information}>Capital: {detailCountry.capital}</h3>
                  <h3 className={styles.modal__information}>Sub Region: {detailCountry.subregion}</h3>
                  <h3 className={styles.modal__information}>Area: {detailCountry.area} m2</h3>
                  <h3 className={styles.modal__information}>Poblacion: {detailCountry.population} hab</h3>
                </div>
                <Link  strict to={`/home`}>
                  <button className={styles.modal__closeContainer} >
                    <span className={styles.modal__close} >Volver al menu</span>
                  </button>
                </Link>
            </div>
          </div>
      </section>
      );

}