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
    geocode_geo: { // Point - the primary point location for the property in WGS84 (SRID 4326), stored as a lon/lat
      type: DataTypes.GEOGRAPHY('POINT', 4326),
      allowNull: true
    },
    parcel_geo: { // Polygon - the parcel boundary polygon in WGS84 (SRID 4326)
      type: DataTypes.GEOGRAPHY('POLYGON', 4326),
      allowNull: true
    },
    building_geo: { // Polygon - the building footprint polygon in WGS84 (SRID 4326)
      type: DataTypes.GEOGRAPHY('POLYGON', 4326),
      allowNull: true
    },
    image_bounds: { // Array of 4 doubles [minLongitude, minLatitude, maxLongitude, maxLatitude] or so called [west, south, east, north]
      type: DataTypes.ARRAY(DataTypes.DOUBLE),
      allowNull: true
    },
    image_url: { // URL string
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
