import { useState, useEffect } from "react";
import Card from "../Card/Card";
import styles from "./Cards.module.css";


export default function Cards(props){
    const {filteredCountries}=props
    const [page,setPage]=useState(10)
    const [tenElements,setTenElements]=useState([])

    useEffect(()=>{
        setTenElements(filteredCountries.slice(0,10));
    },[filteredCountries])

    const nextPage = ()=>{
        const next = page + 10;
        if(page<filteredCountries.length){
            setTenElements(filteredCountries.slice(page,next))
            setPage(next)
        }
    }
    
    const previousPage = ()=>{
        const prev = page -10
        if(page>0){
            setTenElements(filteredCountries.slice(prev,page))
            setPage(prev)
        }
    }

    return (
        <div>
            <button onClick={previousPage}>PAGINA ANTERIOR</button>
            <button onClick={nextPage}>SIGUIENTE PAGINA</button>

            <div className={styles.cardContainer}>
            {tenElements.map (country => {
                return (
                    <Card
                    key={country.ide}
                    ide={country.ide}
                    name={country.name}
                    flagImage={country.flagImage}
                    continente={country.region}
                    />   
                )
            })}
            </div>
        </div>
    )
}
