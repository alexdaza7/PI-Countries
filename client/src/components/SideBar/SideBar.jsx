import styles from './SideBar.module.css'
import React, { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { setFilteredcountries, getActivities, setCountries} from '../../redux/actions';
import SubMenu from './SubMenu/SubMenu';
import earth from '../../assets/earth.png'
import arrow from '../../assets/arrow.png'
import home from '../../assets/home.png'
import list from '../../assets/list.png'
import filter from '../../assets/filter.png'
import filter2 from '../../assets/filter2.png'
import create from '../../assets/tab.png'

export default function SideBar(props){

    const def =['Asia','Americas','Africa','Europe','Oceania','Antarctic']
    const continents = [{name:'ASIA', id:'Asia'}, {name:'AMERICA', id:'Americas'}, {name:'AFRICA', id:'Africa'},
    {name:'ANTARTIDA', id:'Antarctic'},{name:'EUROPA', id:'Europe'},{name:'OCEANIA', id:'Oceania'}]
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

    //este efecto es para cargar por primera vez el array de paises
    useEffect(()=>{
        dispatch(getActivities())
        deleteFilter()
    },[])
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
        setCheckActivities([]);
        const {checked}=event.target
        let activity = allActivities.find(act => act.id === Number(event.target.id))
        console.log(checkActivities)
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
        console.log(checkCountries)
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
        console.log(query)
         dispatch(setCountries(query));
    }

    const [inactive,setIianctive]=useState(false)
    const [orderExpanded,setOrderExpanded]=useState(false)
    const [filterExpanded,setFiilterExpanded]=useState(false)
    const [activitiesExpanded,setActivitiesExpanded]=useState(false)


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
                        setActivitiesExpanded(false)
                        }} 
                    className={styles.toggleIcon} src={arrow} alt="toggle menu" />
                </div>
            </div>
            
            <div className={styles.divider}></div>

            <div className={styles.mainMenu}>
                <ul>
                    <li>
                        <a className={styles.menuItem}>                        
                        <div className={styles.menuIcon}>
                            <img src={home} alt="home icon" />
                        </div>
                        <span>INICIO</span>
                        </a>
                    </li>
                    <li>
                        <a className={styles.menuItem}>                            
                        <div className={styles.menuIcon}>
                            <img src={create} alt="create icon" />  
                        </div>
                        <span>CREAR ACTIVIDAD</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={()=>setOrderExpanded(!orderExpanded)} className={styles.menuItem}>                        
                            <div className={styles.menuIcon}>
                                <img src={list} alt="list icon" />
                            </div>
                            <span>ORDENAR</span>
                        </a>
                        <ul className={`${styles.subMenu} ${orderExpanded ? styles.active: '' }`}>
                        {
                            options.map(option =>{
                                return(
                                <li key={option.id}>
                                    <input type='radio' id={option.id} name='order' value={option.id} onChange={setOrder}/>
                                    <label htmlFor={option.value}>{option.name}</label> 
                                </li>
                                )
                            })
                        }
                        <button onClick={applyFilters}>ORDENAR</button>
                        </ul>
                    </li>
                    <li>
                        <a onClick={()=>setFiilterExpanded(!filterExpanded)} className={styles.menuItem}>                        
                            <div className={styles.menuIcon}>
                                <img src={filter} alt="filter icon" />
                            </div>
                            <span>FILTRO POR CONTINENTES</span>
                        </a>
                        <ul className={`${styles.subMenu} ${filterExpanded ? styles.active: '' }`}>
                        {
                            continents.map(option =>{
                                return(
                                <li key={option.id}>
                                    <input type='checkbox' id={option.id} name={option.id} value={option.id} onChange={filterCountries}/>
                                    <label htmlFor={option.value}>{option.name}</label> 
                                </li>
                                )
                            })
                        }
                        <button onClick={deleteFilter}>ELIMINAR FILTROS</button>
                        <button onClick={applyFilters}>APLICAR FILTROS</button>
                        </ul>
                    </li>
                    <li>
                        <a onClick={()=>setActivitiesExpanded(!activitiesExpanded)} className={styles.menuItem}>                        
                            <div className={styles.menuIcon}>
                                <img src={filter2} alt="filter icon" />
                            </div>
                        <span>FILTRO POR ACTIVIDADES</span>
                        </a>
                        <ul className={`${styles.subMenu} ${activitiesExpanded ? styles.active: '' }`}>
                            {allActivities.map(activity => {
                                return(
                                <li key={activity.id}>
                                    <input type="checkbox" id={activity.id} name={activity.name} value={activity.name} onChange={filterActivities}/>
                                    <label htmlFor={activity.id}>{activity.name}</label>  
                                </li>)
                            })
                            }
                        <button onClick={deleteFilter}>ELIMINAR FILTROS</button>
                        <button onClick={applyFilters}>APLICAR FILTROS</button>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )

}

{/* <li>
<a className={styles.menuItem}>                        
<div className={styles.menuIcon}>
    <img src={filter2} alt="filter icon" />
</div>
<span>ELIMINAR FILTROS</span>
</a>
</li> */}


{/* <div className={styles.container}>
<div className={styles.filterContainer}>

    <br />
    <button onClick={applyFilters}>ORDENAR</button>
    <br />
        <input type="radio" id='noOrder' name='order' value='noOrder' onChange={setOrder}/>
            <label htmlFor="noOrder">Sin orden especifico</label>  
    <br />
        <input type="radio" id='ascByName' name='order' value='ascByName' onChange={setOrder}/>
            <label htmlFor="ascByName">Ascendente por Nombre</label>  
    <br />
    <input type="radio" id='dscByName' name='order' value='dscByName' onChange={setOrder}/>
            <label htmlFor="dscByName">Descendente por Nombre</label>  
    <br />
    <input type="radio" id='ascByPob' name='order' value='ascByPob' onChange={setOrder}/>
            <label htmlFor="ascByPob">Ascendente por Poblacion</label>  
    <br />
    <input type="radio" id='dscByPob' name='order' value='dscByPob' onChange={setOrder}/>
            <label htmlFor="dscByPob">Descendente por Poblacion</label>  
    <br />
    <button onClick={applyFilters}>APLICAR FILTROS</button>
    <h3>CONTINENTES</h3>
    <form action="">
        <input type="checkbox" id='Africa' name='Africa' value='Africa' onChange={filterCountries}/>
        <label htmlFor="Africa">AFRICA</label>  
        <br/>
        <input type="checkbox" id='Americas' name='Americas' value='Americas' onChange={filterCountries}/>
        <label htmlFor="Americas">AMERICA</label> 
        <br/>
        <input type="checkbox" id='Antarctic' name='Antarctic' value='Antarctic' onChange={filterCountries}/>
        <label htmlFor="Antarctic">ANTARTIDA</label> 
        <br/>
        <input type="checkbox" id='Asia' name='Asia' value='Asia' onChange={filterCountries}/>
        <label htmlFor="Asia">ASIA</label> 
        <br/>
        <input type="checkbox" id='Europe' name='Europe' value='Europe' onChange={filterCountries}/>
        <label htmlFor="Europe">EUROPA</label> 
        <br/>
        <input type="checkbox" id='Oceania' name='Oceania' value='Oceania' onChange={filterCountries}/>
        <label htmlFor="Oceania">OCEANIA</label> <br/>
    </form>
    <hr />
    <h3>ACTIVIDADES</h3>
    <form action="">
        {allActivities.map(activity => {
            return(
                <div key={activity.id}>
                    <input type="checkbox" id={activity.id} name={activity.name} value={activity.name} onChange={filterActivities}/>
                    <label htmlFor={activity.id}>{activity.name}</label>  
                    <br/> 
                </div>
            )
        })
        }
    </form>
    <br />
    <button onClick={deleteFilter}>ELIMINAR FILTROS</button>
    <br />
</div>

<Cards filteredCountries={filteredCountries}/>


</div> */}