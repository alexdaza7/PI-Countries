import react, {useState} from 'react';
import axios from 'axios';
import styles from './Form.module.css'
import {useDispatch, useSelector } from "react-redux";

export default function Form(){

    const [newActivity, setNewActivity]=useState({
        name:'',
        dificulty:0,
        duration:'',
        season:'',
        ids:[],
    })
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
            let selectedCountry = document.querySelector('#countriesShow');
            let newCountry = document.createElement('p')
            newCountry.textContent= found.name
            selectedCountry.appendChild(newCountry)
            console.log(newActivity)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(newActivity)
        console.log('esta entrando')
        sendData(newActivity)
    }

    return(

        <form className={styles.Form} action="">

            <label htmlFor="name" className={styles.textBox}>Activity name: </label>
            <input 
                id='name' 
                name='name' 
                placeholder="Digita el nombre de la actividad"
                type="text" 
                value={newActivity.name}
                onChange={handleInputChange}
            />
            <br />

            <label htmlFor="dificulty" className={styles.textBox}>dificulty: </label>
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
            <br />


            <label htmlFor="duration" className={styles.textBox}>duration: </label>
            <input 
                id='duration' 
                name='duration' 
                type="time"
                step='1'
                value={newActivity.duration}
                onChange={handleInputChange}
            />
            <br />
            
            <label htmlFor="season" className={styles.textBox}>season: </label>
            <select name="season" onChange={handleInputChange}>
                <option value="Verano">Verano</option>
                <option value="Otoño">Otoño</option>
                <option value="Invierno">Invierno</option>
                <option value="Primavera">Primavera</option>
                <option value="Verano">Verano</option>
            </select>
            <br />

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
            <p id='countriesShow' >Paises seleccionados: </p>
            <button style={{cursor:'pointer'}} onClick={handleSubmit}>CREATE</button>
        </form>
    )
}