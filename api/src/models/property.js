const { DataTypes } = require('sequelize');
const sequelize = require('../controllers/db');

// Define the Property model - I didn't use it but eventually might be useful
const Property = sequelize.define(
  'Property',
  {
    id: {
      type: DataTypes.STRING(100),
      primaryKey: true
    },
    geocode_geo: {
      type: DataTypes.GEOGRAPHY('POINT', 4326),
      allowNull: true
    },
    parcel_geo: {
      type: DataTypes.GEOGRAPHY('POLYGON', 4326),
      allowNull: true
    },
    building_geo: {
      type: DataTypes.GEOGRAPHY('POLYGON', 4326),
      allowNull: true
    },
    image_bounds: {
      type: DataTypes.ARRAY(DataTypes.DOUBLE),
      allowNull: true
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: 'properties',
    timestamps: false
  }
);

module.exports = Property;
