const { Country } = require('../db');


const getCountries = async()=>{
    const countries=await Country.findAll();
    return countries
    // return prueba;
}


module.exports = getCountries;