import React, { useState } from "react";
import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector } from "react-redux";
import {setSearchedCountry, setFilteredcountries} from '../../redux/actions'


export default function NavBar (){

  const dispatch = useDispatch()
  const countries = useSelector(state=>state.countries)
  const searchedCountries = useSelector(state=>state.searchedCountries)
  const [search,setSearch]=useState('');

   // Esta funcion es para setear el estado global "countries", con los datos originales (sin los parametros de busqueda)
   function deleteSearch(){
      dispatch(setFilteredcountries(countries));
      const getElements = document.querySelectorAll("input[type='search']")
      getElements[0].value='';
      setSearch('')
      dispatch(setSearchedCountry())
   }

   //Esta funcion es para setear el estado global "countries", con los resultados obtenidos por la busqueda
   function getName (event){
      setSearch(event.target.value)
      dispatch(setSearchedCountry(search));
   }

   //Esta funcion es para hacer el dispatch de los resultados obtenidos en la busqueda
   function disp (){
      console.log(search)
      if(search !==''){
         dispatch(setFilteredcountries(searchedCountries))
      } else{
         window.alert('Debe introducir el nombre de un pais para su busqueda')
      }
   }
  
  return (  
   <div>
    <nav className={styles.NavBar}>
       <input className={styles.SearchBox} onChange={getName} placeholder='Digita el nombre del pais que deseas buscar' type='search'/>
       <button className={styles.Button} onClick={deleteSearch}>X</button>
          <button className={styles.Button} onClick={disp}>Buscar</button>
    </nav>
   </div>
    )
  }