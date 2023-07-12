import React, { useState, useEffect } from "react";
import styles from './NavBar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector } from "react-redux";
import {setSearchedCountry, setFilteredcountries, setCountries} from '../../redux/actions'


export default function NavBar (){

//   const[name,setName] = useState('')
  const dispatch = useDispatch()
  const countries = useSelector(state=>state.countries)
  const filteredCountries = useSelector(state=>state.filteredCountries)
  const navigate = useNavigate()

   const [savedCountries,setsaveCountries]=useState(countries)

   // Esta funcion es para setear el estado global "countries", con los datos originales (sin los parametros de busqueda)
   function deleteSearch(){
      dispatch(setFilteredcountries(savedCountries));
      const getElements = document.querySelectorAll("input[type='search']")
      getElements[0].value='';
      dispatch(setCountries())
   }

   //Esta funcion es para setear el estado global "countries", con los resultados obtenidos por la busqueda
   function getName (event){
      let query = `name=${event.target.value}`
      console.log(query)
      dispatch(setCountries(query));
   }
  
  return (  
    <nav className={styles.NavBar}>
       <input className={styles.SearchBox} onChange={getName} placeholder='Digita el nombre del pais que deseas buscar' type='search'/>
       <button className={styles.Button} onClick={deleteSearch}>X</button>
          <button className={styles.Button} onClick={()=>dispatch(setFilteredcountries(countries))}>Buscar</button>
       <NavLink to='/Home'>
          <button className={styles.Button}> Home </button>
       </NavLink>
       <NavLink to='/NewActivity'>
          <button className={styles.Button}> Nueva actividad </button>
       </NavLink>
    </nav>
    )
  }