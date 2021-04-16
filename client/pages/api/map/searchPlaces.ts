import { MAP_KEY } from '../../../utils/keys';
import axios from 'axios';

export default async (req, res) => {
	const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURI(
		req.query.search
	)}&language=ko&key=${MAP_KEY}`;

	const googlePlace = await axios.get(url);

	res.json({ places: googlePlace.data.results });
};
