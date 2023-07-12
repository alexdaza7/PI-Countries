const { Country } = require('../db');


const getCoAscendentByName = async()=>{
    const AscendentByName =await Country.findAll({
        order: [
            ['name', 'ASC']
        ]
    });
    return AscendentByName
}


module.exports = getCoAscendentByName;