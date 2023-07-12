const { Country } = require('../db');


const getCoDescendentByName = async()=>{
    const DescendentyName =await Country.findAll({
        order: [
            ['name', 'DESC']
        ]
    });
    return DescendentyName
}


module.exports = getCoDescendentByName;