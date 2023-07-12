const { Country } = require('../db');


const getCoAscendentByPob = async()=>{
    const AscendentByPob =await Country.findAll({
        order: [
            ['population', 'DESC']
        ]
    });
    return AscendentByPob
}


module.exports = getCoAscendentByPob;