import styles from "./Card.module.css";
import { Link } from "react-router-dom";



export default function Card (props){
    const {flagImage, name, continente, ide}=props

    return(
        <Link strict to={`/detail/${ide}`} className={styles.container}>
            <div>
                <img className={styles.cardImage}src={flagImage} alt= {`esta es la imagen de la bandera del pais ${name}`} />
                <h2>PAIS: {name}</h2>
                <h2>CONTINENTE: {continente}</h2>
            </div>
        </Link>
    )

}