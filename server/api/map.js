const mysql = require('../db/mysql');
const password = require('../db/password');
const axios = require('axios');

module.exports.searchPlaces = async (req, res) => {
	console.log(req.query.search);

	const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURI(
		req.query.search
	)}&language=ko&key=${password.MAP_KEY}`;
	const googlePlace = await axios.get(url);

	console.log(googlePlace);
	res.json({ places: googlePlace.data.results });
};
