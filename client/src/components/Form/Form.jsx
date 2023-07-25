import {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Form.module.css'
import {useDispatch, useSelector } from "react-redux";
import{formActive} from '../../redux/actions';
import validator from './formValidator';

export default function Form(){

    const dispatch = useDispatch()
    const formStatus = useSelector(state=>state.formStatus)

    useEffect(()=>{
        setNewActivity({        
        name:'',
        dificulty:0,
        duration:0,
        season:'',
        ids:[]});
        setSelectedCountries([])
    },[formStatus])

    const [newActivity, setNewActivity]=useState({
        name:'',
        dificulty:0,
        duration:0,
        season:'',
        ids:[],
    })

    const [validation,setValidation]=useState({})
    const [selectedCountries,setSelectedCountries]=useState([]);

    const countries = useSelector(state=>state.countries)

    const sendData = async (newActivity) =>{
        const send = await axios.post('http://localhost:3001/activities',newActivity)
        return send
    }

    const handleInputChange = (event)=>{
        setNewActivity({
            ...newActivity,
            [event.target.name]: event.target.value
        })

        setValidation(validator({
            ...newActivity,
            [event.target.name]: event.target.value
        }))
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
        const {name, dificulty, duration, season, ids} = newActivity
        if( name===''|| dificulty=== 0|| duration===''|| season===''|| ids.length===0){
            return window.alert('Todos los campos marcados con * deben estar completos')
        } else if (Object.keys(validation).length>0){
            return window.alert('Debe diligenciar los datos de forma correcta')
        }
        sendData(newActivity)
        dispatch(formActive(false))
    }

    return(

        <section className={`${styles.modalFormSection} ${formStatus? styles.active : '' }`}>
            <div className={styles.modalFormContainer}>
                <div className={styles.modalInformation}>
                    <div className={styles.modalTitle}>
                        <h1 className={styles.formTitle}>NUEVA ACTIVIDAD</h1>
                    </div>
                    <form className={styles.modalForm} action="">
                        <div className={styles.inputContainer}>
                            <label htmlFor="name" className={styles.textBox}>Nombre:* </label>
                            <input
                                className={styles.inputBox} 
                                id='name' 
                                name='name' 
                                placeholder="Digita el nombre de la actividad"
                                type="text" 
                                value={newActivity.name}
                                onChange={handleInputChange}
                            />
                            {validation? <p className={styles.textAlert}>{validation.nameError}</p>:<></>}
                        </div>

                        <div className={styles.inputContainer}>
                            <label htmlFor="dificulty" className={styles.textBox}>Dificultad: * </label>
                            <div style={{display:'flex'}}>
                            <input 
                                className={styles.inputBox}
                                id='dificulty' 
                                name='dificulty' 
                                type="range"
                                min="1"
                                max="5"
                                value={newActivity.dificulty}
                                onChange={handleInputChange}
                                />
                            <span>{newActivity.dificulty}</span>
                            </div>
                            {validation? <p className={styles.textAlert}>{validation.dificultyError}</p>:<></>}
                        </div>

                        <div className={styles.inputContainer}>
                            <label htmlFor="duration" className={styles.textBox}>Duración: </label>
                            <div style={{display:'flex'}}>
                            <input 
                                className={styles.inputBox}
                                id='duration' 
                                name='duration' 
                                type="range"
                                min="0"
                                max="12"
                                step="0.2"
                                value={newActivity.duration}
                                onChange={handleInputChange}
                            />
                            <span>{newActivity.duration}h</span>
                            </div>
                            {validation? <p className={styles.textAlert}>{validation.durationError}</p>:<></>}
                        </div>

                        <div className={styles.inputContainer}>
                            <label htmlFor="season" className={styles.textBox}>Temporada:* </label>
                            <select className={styles.inputBox} name="season" onChange={handleInputChange}>
                                <option value="Verano">Verano</option>
                                <option value="Otoño">Otoño</option>
                                <option value="Invierno">Invierno</option>
                                <option value="Primavera">Primavera</option>
                                <option value="Verano">Verano</option>
                            </select>
                            {validation? <p className={styles.textAlert}>{validation.seasonError}</p>:<></>}
                        </div>

                        <div className={styles.inputContainer}>
                        <label htmlFor="ids" className={styles.textBox}>Paises:*</label>
                            <select className={styles.inputBox2} name='paises' onChange={handleSelectChange}>
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
                            {validation? <p className={styles.textAlert}>{validation.idsError}</p>:<></>}
                        </div>
                        <div className={styles.inputContainer}>
                            <p className={styles.textBox} >Paises seleccionados: </p>
                            <div className={styles.selecCountries}>
                                {
                                selectedCountries.map(c=>{
                                    return(
                                        <p>{c.name}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </form>
                        <div className={styles.formButtons}>
                            <button className={styles.formButton} onClick={()=>dispatch(formActive(false))}>
                                <span className={styles.textButton}>DESCARTAR</span>
                            </button>
                            <button  className={styles.formButton} style={{cursor:'pointer'}} onClick={handleSubmit}>
                                <span className={styles.textButton}>CREAR</span>
                            </button>
                        </div>
                </div>
            </div>
        </section>
    )
}