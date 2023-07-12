const { Country } = require('../db');


const getCountriesById = async (id)=>{
    const countriesById=await Country.findAll({
        where: {
            ide: id
        },
    });
    return countriesById;
}


module.exports = getCountriesById;