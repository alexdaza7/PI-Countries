const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificulty:{
      type: DataTypes.STRING,
      allowNull: false,
        // type: DataTypes.INTEGER,
        // allowNull: false,
        // validate:{
        //     min: 1,
        //     max: 5,
        // }
    },
    duration:{
        type: DataTypes.STRING,
    },
    season:{
        type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno','Primavera'),
        allowNull: false,
    }
  },
  {
    timestamps: false
  });
};