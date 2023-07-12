const { Country } = require('../db');


const getCoDescendentByPob = async()=>{
    const DescendentyPob =await Country.findAll({
        order: [
            ['population', 'ASC']
        ]
    });
    return DescendentyPob
}


module.exports = getCoDescendentByPob;