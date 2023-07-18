const { Activity } = require('../db');

const createActivity = async ({
    id, 
    name, 
    dificulty, 
    duration, 
    season, 
    ids
})=>{
    const act = await Activity.create({
        id, 
        name, 
        dificulty, 
        duration, 
        season
    });

    act.addCountry(ids);
    console.log('se ejecuto')

    return act;
}


module.exports = createActivity;