import styles from "./Card.module.css";
import { Link } from "react-router-dom";



export default function Card (props){
    
    const {flagImage, name, continente, ide}=props

    return(
        <Link strict to={`/detail/${ide}`} className={styles.container}>
            <div className={styles.card}>
                <span className={styles.country}>{name.toUpperCase()}</span>
                <img className={styles.cardImage}src={flagImage} alt= {`esta es la imagen de la bandera del pais ${name}`} />
                <h2 className={styles.continent}>{continente}</h2>
            </div>
        </Link>
    )

}