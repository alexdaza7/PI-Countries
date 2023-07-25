const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('Activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificulty:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
          min: 1,
          max: 5,
      }
    },
    duration:{
      type: DataTypes.DECIMAL(2,1)
    },
    season:{
      type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno','Primavera'),
      allowNull: true,
    }
  },
  {
    timestamps: false
  });
};