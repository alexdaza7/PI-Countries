import react, {useState} from 'react';
import axios from 'axios';
import styles from './Form.module.css'
import {useDispatch, useSelector } from "react-redux";
import{formActive} from '../../redux/actions';
import activities from '../../assets/activities.png'

export default function Form(){

    const dispatch = useDispatch()
    const formStatus = useSelector(state=>state.formStatus)

    const [newActivity, setNewActivity]=useState({
        name:'',
        dificulty:0,
        duration:'',
        season:'',
        ids:[],
    })
    const [selectedCountries,setSelectedCountries]=useState([]);

    const countries = useSelector(state=>state.countries)

    const sendData = async (newActivity) =>{
        console.log(newActivity)
        const send = await axios.post('http://localhost:3001/activities',newActivity)
    }

    const handleInputChange = (event)=>{
        setNewActivity({
            ...newActivity,
            [event.target.name]: event.target.value
        })
        console.log(newActivity)
    }

    const handleSelectChange = (event)=>{
        if(newActivity.ids.includes(event.target.value)) {
            window.alert('este pais ya fue seleccionado')
        } else{
            setNewActivity({
                ...newActivity,
                ids:[...newActivity.ids, event.target.value]
            })
            let found = countries.find(country => country.ide === event.target.value)
            setSelectedCountries([...selectedCountries, found])
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(newActivity)
        console.log('esta entrando')
        sendData(newActivity)
    }

    return(

        <section className={`${styles.modalFormSection} ${formStatus? styles.active : '' }`}>
            <div className={styles.modalFormContainer}>
                <img className={styles.modalImage} src={activities} alt="imagen de actividades" />
                <div className={styles.modalInformation}>
                    <div className={styles.modalTitle}>
                        <h1 className={styles.formTitle}>NUEVA ACTIVIDAD</h1>
                        <button className={styles.exitButton} onClick={()=>dispatch(formActive(false))}>X</button>
                    </div>
                    <form className={styles.modalForm} action="">
                        <div className={styles.inputContainer}>
                            <label htmlFor="name" className={styles.textBox}>Nombre: * </label>
                            <input 
                                id='name' 
                                name='name' 
                                placeholder="Digita el nombre de la actividad"
                                type="text" 
                                value={newActivity.name}
                                onChange={handleInputChange}
                                />
                            <br />
                        </div>

                        <div className={styles.inputContainer}>
                            <label htmlFor="dificulty" className={styles.textBox}>dificultad: * </label>
                            <input 
                                id='dificulty' 
                                name='dificulty' 
                                type="range"
                                min="0"
                                max="5"
                                value={newActivity.dificulty}
                                onChange={handleInputChange}
                                />
                            <span>{newActivity.dificulty}</span>
                        </div>

                        <div className={styles.inputContainer}>
                            <label htmlFor="duration" className={styles.textBox}>duration: </label>
                            <input 
                                id='duration' 
                                name='duration' 
                                type="time"
                                step='1'
                                value={newActivity.duration}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.inputContainer}>
                            <label htmlFor="season" className={styles.textBox}>season: </label>
                            <select name="season" onChange={handleInputChange}>
                                <option value="Verano">Verano</option>
                                <option value="Otoño">Otoño</option>
                                <option value="Invierno">Invierno</option>
                                <option value="Primavera">Primavera</option>
                                <option value="Verano">Verano</option>
                            </select>
                        </div>

                        <div className={styles.inputContainer}>
                        <label htmlFor="ids" className={styles.textBox}>ids</label>
                            <select name='paises' onChange={handleSelectChange}>
                                {
                                    countries.map(element => {
                                        return (
                                            <option key={element.ide} value={element.ide} name={element.name}>
                                                {element.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className={styles.inputContainer}>
                        <p id='countriesShow' >Paises seleccionados: </p>
                        {
                            selectedCountries.map(c=>{
                                return(
                                    <p>{c.name}</p>
                                )
                            })
                        }
                        </div>
                        <button style={{cursor:'pointer'}} onClick={handleSubmit}>CREATE</button>
                    </form>
                </div>
            </div>
        </section>
    )
}