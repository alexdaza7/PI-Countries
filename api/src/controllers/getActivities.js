const { Activity, Country } = require('../db');


const getActivities = async()=>{
    const activities = await Activity.findAll({
        include: [
          {
            model: Country,
            as: 'Country',
            through: { attributes: [] }, // Excluye los atributos de la tabla intermedia
          },
        ],
      });
    return activities
}


module.exports = getActivities;