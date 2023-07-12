const { country_activity } = require('../db');


const getRelation = async()=>{
    const relation=await country_activity.findAll();
    return relation
}


module.exports = getRelation;