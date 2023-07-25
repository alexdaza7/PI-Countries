import styles from './SideBar.module.css'
import React, { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { setFilteredcountries, getActivities, setCountries, formActive} from '../../redux/actions';
import earth from '../../assets/earth.png'
import arrow from '../../assets/arrow.png'
import list from '../../assets/list.png'
import filter from '../../assets/filter.png'
import filter2 from '../../assets/filter2.png'
import create from '../../assets/tab.png'

export default function SideBar(props){

    const def =['Asia','Americas','Africa','Europe','Oceania','Antarctic']
    const continents = [
        {name:'ASIA', id:'Asia'}, 
        {name:'AMERICA', id:'Americas'}, 
        {name:'AFRICA', id:'Africa'},
        {name:'ANTARTIDA', id:'Antarctic'},
        {name:'EUROPA', id:'Europe'},
        {name:'OCEANIA', id:'Oceania'}
    ]
    const options=[
        {name:'Sin orden especifico', id:'noOrder'},
        {name:'Ascendente por Nombre', id:'ascByName'},
        {name:'Descendente por Nombre', id:'dscByName'},
        {name:'Ascendente por poblacion', id:'ascByPob'},
        {name:'Descendente por poblacion', id:'dscByPob'},
    ]
    let [checkCountries,setCheckCountries]=useState([])
    let [checkActivities,setCheckActivities]=useState([])
    const dispatch = useDispatch();
    
    // const filteredCountries = useSelector(state=>state.filteredCountries)
    const countries = useSelector(state=>state.countries)
    const allActivities = useSelector(state=>state.allActivities)
    const formStatus = useSelector(state=>state.formStatus)

    // Estos son estados para controlar la barra lateral
    const [inactive,setIianctive]=useState(true)
    const [orderExpanded,setOrderExpanded]=useState(false)
    const [filterExpanded,setFiilterExpanded]=useState(false)
    const [activitiesExpanded,setActivitiesExpanded]=useState(false)

    //este efecto es para cargar por primera vez el array de paises
    useEffect(()=>{
        dispatch(getActivities())
        deleteFilter()
    },[formStatus,activitiesExpanded])
    //esta funcion es para guardar cuales son los filtros de continentes aplicados al presionar un checkbox
    const filterCountries= (event) =>{
        const {checked}=event.target
        if(checked){
            setCheckCountries([...checkCountries, event.target.id]);
        }else {
            setCheckCountries(checkCountries.filter(ch=>ch !==event.target.id));
           
        }
    }
    //esta funcion es para guardar cuales son los filtros de actividades aplicados al presionar un checkbox
    const filterActivities= (event) =>{
        // setCheckActivities([]);
        const {checked}=event.target
        let activity = allActivities.find(act => act.id === Number(event.target.id))
        if(checked){
            setCheckActivities([...checkActivities, activity]);
        }else {
            setCheckActivities(checkActivities.filter(ch=> ch.id!== Number(event.target.id)));
        }

    }

    //esta funcion es para aplicar los filtros
    function applyFilters (){
        dispatch(setFilteredcountries(countries,def,[]))
        if(checkCountries.length===0 && checkActivities.length===0) {
            deleteFilter()
            return
        }
        if(checkCountries.length===0) {
            dispatch(setFilteredcountries(countries,def,checkActivities))
            return
        }
        dispatch(setFilteredcountries(countries,checkCountries,checkActivities))
    }
    //esta funcion es para borrar los filtros y cargar todos los paises
    function deleteFilter (){
        setCheckCountries([]);
        setCheckActivities([]);
        dispatch(setFilteredcountries(countries,def,[]))
        const getElements = document.querySelectorAll("input[type='checkbox']")
        getElements.forEach(function(checkbox) {
            checkbox.checked = false; // Cambiar el estado false
        })
    }
    // esta funcion es para los filtros de ordenamiento
    function setOrder (event){
        let query = `${event.target.value}=yes`
         dispatch(setCountries(query));
    }


    return(
        <div className={`${styles.sideMenu} ${inactive? styles.inactive: ''}`}>
            <div className={styles.topSection}>
                <div className={styles.logo}>
                    <img src={earth} alt="logo de la tierra" />
                </div>
                <div className={styles.toggleMenu}>
                    <img onClick={()=>{
                        setIianctive(!inactive); 
                        setOrderExpanded(false);
                        setFiilterExpanded(false);
                        setActivitiesExpanded(false);
                        }} 
                    className={styles.toggleIcon} src={arrow} alt="toggle menu" />
                </div>
            </div>
            
            <div className={styles.mainMenu}>
                <ul>
                    <li>
                        <span className={styles.menuItem}>                            
                        <div className={styles.menuIcon}>
                            <img src={create} alt="create icon" />  
                        </div>
                        <span onClick={()=>
                            {dispatch(formActive(true))
                            setOrderExpanded(false)
                            setFiilterExpanded(false);
                            setActivitiesExpanded(false);
                            }}>CREAR ACTIVIDAD</span>
                        </span>
                    </li>
                    <li>
                        <div>
                        <span onClick={()=>{
                            setOrderExpanded(!orderExpanded)
                            setFiilterExpanded(false);
                            setActivitiesExpanded(false);}} 
                            className={styles.menuItem}>

                            <div className={styles.menuIcon}>
                                <img src={list} alt="list icon" />
                            </div>
                            <span>ORDENAR</span>
                        </span>
                        <ul className={`${styles.subMenu} ${orderExpanded ? styles.active: '' }`}>
                            <button onClick={applyFilters}>ORDENAR</button>
                        {
                            options.map(option =>{
                                return(
                                <li key={option.id}>
                                    <input type='radio' id={option.id} name='order' value={option.id} onChange={setOrder}/>
                                    <label htmlFor={option.id}>{option.name}</label> 
                                </li>
                                )
                            })
                        }
                        </ul>
                        </div>
                    </li>
                    <li>
                        <span onClick={()=>{
                            setOrderExpanded(false)
                            setFiilterExpanded(!filterExpanded);
                            setActivitiesExpanded(false);}} 
                            className={styles.menuItem}>                        
                            <div className={styles.menuIcon}>
                                <img src={filter} alt="filter icon" />
                            </div>
                            <span>FILTRO POR CONTINENTES</span>
                        </span>
                        <ul className={`${styles.subMenu} ${filterExpanded ? styles.active: '' }`}>
                            <button onClick={deleteFilter}>X</button>
                            <button onClick={applyFilters}>✔</button>
                        {
                            continents.map(option =>{
                                return(
                                <li key={option.id}>
                                    <input type='checkbox' id={option.id} name={option.id} value={option.id} onChange={filterCountries}/>
                                    <label htmlFor={option.id}>{option.name}</label> 
                                </li>
                                )
                            })
                        }
                        </ul>
                    </li>
                    <li>
                    <span onClick={()=>{
                            setOrderExpanded(false)
                            setFiilterExpanded(false);
                            setActivitiesExpanded(!activitiesExpanded);}} 
                            className={styles.menuItem}>                           
                            <div className={styles.menuIcon}>
                                <img src={filter2} alt="filter icon" />
                            </div>
                        <span>FILTRO POR ACTIVIDADES</span>
                    </span>
                        <ul className={`${styles.subMenu} ${activitiesExpanded ? styles.active: '' }`}>
                            <button onClick={deleteFilter}>X</button>
                            <button onClick={applyFilters}>✓</button>
                            {allActivities.map(activity => {
                                return(
                                <li key={activity.id}>
                                    <input type="checkbox" id={activity.id} name={activity.name} value={activity.name} onChange={filterActivities}/>
                                    <label htmlFor={activity.id}>{activity.name.toUpperCase()}</label>  
                                </li>)
                            })
                            }
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )

}
