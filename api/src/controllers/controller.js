const axios = require('axios');
const sharp = require('sharp');
const { QueryTypes } = require('sequelize');
const sequelize = require('./db');

const PARCEL_DEFAULT_COLOR = 'orange';
const BUILDING_DEFAULT_COLOR = 'green';

const geoSelect = `
  SELECT id,
         ST_AsGeoJSON(geocode_geo)::json AS geocode_geo,
         ST_AsGeoJSON(parcel_geo)::json AS parcel_geo,
         ST_AsGeoJSON(building_geo)::json AS building_geo,
         image_bounds,
         image_url
  FROM properties`;

const controller = {
	// Map geographic coordinates to pixel coordinates
	mapCoordinateToPixel: (lon, lat, bounds, width, height) => {
		if (!bounds || bounds.length !== 4 || !width || !height) {
			return [0, 0];
		}
		const [minLon, minLat, maxLon, maxLat] = bounds;
		const lonSpan = maxLon - minLon;
		const latSpan = maxLat - minLat;
		if (lonSpan === 0 || latSpan === 0) return [0, 0];
		const x = ((lon - minLon) / lonSpan) * width;
		const y = ((maxLat - lat) / latSpan) * height;
		return [x, y];
	},

	// Extract polygons from GeoJSON geometry
	polygonsFromGeometry: (geometry) => {
		if (!geometry) return [];
		if (geometry.type === 'Polygon') {
			return geometry.coordinates || [];
		}
		if (geometry.type === 'MultiPolygon') {
			// Flatten MultiPolygon into array of polygon rings
			return (geometry.coordinates || []).flat();
		}
		return [];
	},

	// Build SVG overlay from parcel and building geometries
	buildOverlaySvg: (parcelGeo, buildingGeo, parcelColor, buildingColor, bounds, width, height) => {
		const parts = [];
		const parcelPolygons = controller.polygonsFromGeometry(parcelGeo);
		const buildingPolygons = controller.polygonsFromGeometry(buildingGeo);

		parcelPolygons.forEach((polygon, idx) => {
			const points = polygon.map(([lon, lat]) => controller.mapCoordinateToPixel(lon, lat, bounds, width, height));
			if (points.length) {
				const formatted = points.map(([x, y]) => `${x},${y}`).join(' ');
				parts.push(`<polygon points="${formatted}" fill="none" stroke="${parcelColor}" stroke-width="3" stroke-opacity="0.8" id="parcel-${idx}"/>`);
			}
		});

		buildingPolygons.forEach((polygon, idx) => {
			const points = polygon.map(([lon, lat]) => controller.mapCoordinateToPixel(lon, lat, bounds, width, height));
			if (points.length) {
				const formatted = points.map(([x, y]) => `${x},${y}`).join(' ');
				parts.push(`<polygon points="${formatted}" fill="none" stroke="${buildingColor}" stroke-width="3" stroke-opacity="0.8" id="building-${idx}"/>`);
			}
		});

		if (!parts.length) return null;
		return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${parts.join('')}</svg>`;
	},

	// Fetch base image from URL
	fetchBaseImage: async (url) => {
		const response = await axios.get(url, { responseType: 'arraybuffer' });
		return Buffer.from(response.data);
	},

	// Overlay polygons onto image
	withOverlay: async (imageBuffer, options) => {
		const { parcelGeo, buildingGeo, bounds, parcelColor, buildingColor } = options;
		const image = sharp(imageBuffer);
		const meta = await image.metadata();
		const width = meta.width || 1024;
		const height = meta.height || 1024;

		const svg = controller.buildOverlaySvg(parcelGeo, buildingGeo, parcelColor, buildingColor, bounds, width, height);
		if (!svg) {
			return image.jpeg().toBuffer();
		}

		return image
			.composite([
				{
					input: Buffer.from(svg),
					top: 0,
					left: 0
				}
			])
			.jpeg()
			.toBuffer();
		},

	// Fetch all properties
	getProperties: async (req, res) => {
		try {
			const properties = await sequelize.query(geoSelect, {
				type: QueryTypes.SELECT
			});
			res.json(properties);
		} catch (error) {
			res.status(500).json({ message: 'Failed to fetch properties', error: error.message });
		}
	},

	getPropertyById: async (req, res) => {
		try {
			const { id } = req.params;
			if (!id) return res.status(400).json({ message: 'Property id is required' });

			const [property] = await sequelize.query(
				`${geoSelect} WHERE id = :id LIMIT 1`,
				{ replacements: { id }, type: QueryTypes.SELECT }
			);

			if (!property) {
				return res.status(404).json({ message: 'Property not found' });
			}

			res.json(property);
		} catch (error) {
			res.status(500).json({ message: 'Failed to fetch property', error: error.message });
		}
	},

	// Find properties within a certain distance from a point
	findProperties: async (req, res) => {
		try {
			const { geometry, type, 'x-distance': xDistance } = req.body || {};
			if (!geometry || geometry.type !== 'Point' || !Array.isArray(geometry.coordinates)) {
				return res.status(400).json({ message: 'Body must contain a GeoJSON Point geometry' });
			}
			const distance = Number(xDistance) || 10000;
			const geometryJson = JSON.stringify(geometry);

			const ids = await sequelize.query(
				`SELECT id FROM properties WHERE ST_DWithin(geocode_geo, ST_SetSRID(ST_GeomFromGeoJSON(:geometry), 4326)::geography, :distance)`,
				{
					replacements: { geometry: geometryJson, distance },
					type: QueryTypes.SELECT
				}
			);

			res.json(ids.map((row) => row.id));
		} catch (error) {
			res.status(500).json({ message: 'Failed to execute search', error: error.message });
		}
	},

	// Display property image with optional overlays
	displayProperty: async (req, res) => {
		try {
			const { id } = req.params;
			if (!id) return res.status(400).json({ message: 'Property id is required' });

			const [property] = await sequelize.query(
				`${geoSelect} WHERE id = :id LIMIT 1`,
				{ replacements: { id }, type: QueryTypes.SELECT }
			);

			if (!property) {
				return res.status(404).json({ message: 'Property not found' });
			}

			const overlayEnabled = (req.query.overlay || '').toLowerCase() === 'yes';
			const parcelColor = req.query.parcel || PARCEL_DEFAULT_COLOR;
			const buildingColor = req.query.building || BUILDING_DEFAULT_COLOR;

			const baseImage = await controller.fetchBaseImage(property.image_url);

			if (!overlayEnabled) {
				const jpegBuffer = await sharp(baseImage).jpeg().toBuffer();
				res.set('Content-Type', 'image/jpeg');
				return res.send(jpegBuffer);
			}

			const imageBuffer = await controller.withOverlay(baseImage, {
				parcelGeo: property.parcel_geo,
				buildingGeo: property.building_geo,
				bounds: property.image_bounds,
				parcelColor,
				buildingColor
			});

			res.set('Content-Type', 'image/jpeg');
			res.send(imageBuffer);
		} catch (error) {
			console.error(error);
			const baseImage = await controller.fetchBaseImage('https://placehold.co/600x400?text=Error+Loading+Image');
			const jpegBuffer = await sharp(baseImage).jpeg().toBuffer();
			res.set('Content-Type', 'image/jpeg');
			res.send(jpegBuffer);
		}
	}	
};

module.exports = controller