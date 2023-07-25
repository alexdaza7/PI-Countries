import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from "./Cards.module.css";
import NavBar from "../NavBar/NavBar";


export default function Cards(){
    const [page,setPage]=useState(10)
    const [tenElements,setTenElements]=useState([]);
    const formStatus = useSelector(state=>state.formStatus);
    const filteredCountries=useSelector(state=>state.filteredCountries);

    useEffect(()=>{
        setTenElements(filteredCountries.slice(0,10));
        setPage(10)
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
            <p className={styles.paginado}>esta es la pagina {(page===0?1:page/10)} de {Math.ceil(filteredCountries.length/10)}</p>
            <p className={styles.paginado}>Paises totales: {filteredCountries.length}</p>
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
            <div>
                {(tenElements.length<1)? <p className={styles.warning}> Ops... no se han encontrado coincidencias </p>:<></>}
            </div>
        </div>
    )
}
