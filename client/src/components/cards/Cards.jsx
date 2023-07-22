import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from "./Cards.module.css";
import NavBar from "../NavBar/NavBar";


export default function Cards(props){
    const {filteredCountries}=props
    const [page,setPage]=useState(10)
    const [tenElements,setTenElements]=useState([])
    const formStatus = useSelector(state=>state.formStatus)

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
        <div className={`${styles.allContainer} ${formStatus? styles.active : '' }`}>
            <div className={styles.navContainer}>
            <NavBar previousPage={previousPage} nextPage={nextPage}/>

            </div>

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
