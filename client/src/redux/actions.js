import axios from 'axios';

const SET_COUNTRIES='SET_COUNTRIES';
const SET_FILTEREDCOUNTRIES='SET_FILTEREDCOUNTRIES';
const SET_SEARCHEDCOUNTRY='SET_SEARCHEDCOUNTRY';
const GET_ACTIVITIES='GET_ACTIVITIES';


export function setCountries(order){
    return function(dispatch){
       axios(`http://localhost:3001/countries?${order}`)
       .then(response=> {
         dispatch({
         type: SET_COUNTRIES, 
         payload: response.data
         })
        }) 
    }
} 


export function  setFilteredcountries(countries,checkCountries,checkActivities){

      let filtered = [] 
      if(!checkCountries && !checkActivities){ 
        filtered = countries
        return  function(dispatch){

          dispatch({type: SET_FILTEREDCOUNTRIES, payload: filtered,})
       } 
      }

      if(checkActivities.length>0){
        countries=[];
        checkActivities.forEach(activity=> activity.Country.forEach(coun=>countries.push(coun)))
      }
      countries.map(country =>{
        checkCountries.forEach(continent => {
          if(country.region === continent){
            filtered.push(country)
          }
        });
        return country
      })
    return function(dispatch){
        dispatch({type: SET_FILTEREDCOUNTRIES, payload: filtered,})
     } 
}

export function setFilteredcountries2(searchedCountries){
return {
  type: SET_FILTEREDCOUNTRIES, 
  payload: searchedCountries,
}
}

export function setSearchedCountry (name){
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/countries?name=${name}`);
        dispatch({type: SET_SEARCHEDCOUNTRY, payload: response.data})
    }
}

export function getActivities (){
  return async function(dispatch){
    const response = await axios('http://localhost:3001/activities');
    dispatch({type: GET_ACTIVITIES, payload: response.data})
}
}
