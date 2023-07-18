import styles from './SideBar.module.css'
import React, { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { setFilteredcountries, getActivities, setCountries} from '../../redux/actions';

export default function SideBar(props){

    const def = ['Asia', 'Americas', 'Africa', 'Europe', 'Oceania', 'Antarctic']
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
    //esta funcion es para los filtros de ordenamiento
    function setOrder (event){
        let query = `${event.target.value}=yes`
        console.log(query)
         dispatch(setCountries(query));
    }

    return(
        <div className={styles.container}>
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

            {/* <Cards filteredCountries={filteredCountries}/> */}
           

        </div>

    )

}
