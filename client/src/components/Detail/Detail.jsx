import React, { useState, useEffect } from "react";
// import { styles } from "./Detail.module.css";
import { useParams } from "react-router-dom";

export default function Detail (props){

    const {countries}=props
    const {ide}= useParams();
    const [detailCountry, setDetailCountry] = useState({});

    useEffect(() => {
      const foundCountry = countries.find(country=> country.ide===ide)
      setDetailCountry(foundCountry)
      },[ide,countries]);

    return (
        <div>
          <h1>{detailCountry.ide}</h1>
          <h1>{detailCountry.name}</h1>
          <img src={detailCountry.flagImage} alt="" />
          <h1>{detailCountry.region}</h1>
          <h1>{detailCountry.capital}</h1>
          <h1>{detailCountry.subRegion}</h1>
          <h1>{detailCountry.area}</h1>
          <h1>{detailCountry.population}</h1>
        </div>
      );

}