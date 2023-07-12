const { Country } = require('../db');
const { Op } = require('sequelize');


const getCountriesByName = async (name)=>{
    const countriesByName=await Country.findAll({
        where: {
            name:{
                [Op.iLike]: `%${name}%`
            }
        }
    });
    return countriesByName;
}


module.exports = getCountriesByName;