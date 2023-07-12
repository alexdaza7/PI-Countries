
const initiaState ={
    countries:[],
    filteredCountries:[],
    searchedCountries:[],
    allActivities:[],
}

const rootReducer = (state=initiaState, action)=>{

    switch(action.type){

        case 'SET_COUNTRIES':
            return{
                ...state,
                countries: action.payload
            }

        case 'SET_FILTEREDCOUNTRIES':
            return{
                ...state,
                filteredCountries: action.payload
            }

        case 'SET_SEARCHEDCOUNTRY':
            return{
                ...state,                
                searchedCountries: action.payload
            }

        case 'GET_ACTIVITIES':
            return{
                ...state,                
                allActivities: action.payload
            }

        default:
            return{
                ...state
            }
    }
}

export default rootReducer;