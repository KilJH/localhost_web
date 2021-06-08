import React from 'react';
import styled from 'styled-components';
import { Place } from '../../interfaces/index';
import PlaceIcon from '@material-ui/icons/Place';
import GoogleMap from 'google-map-react';
import { MAP_KEY } from '../../client/utils/keys';

interface Props {
	place: Place;
}

const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& > div.address {
		margin-bottom: 0.5rem;
	}

	& > div:nth-child(2) {
		flex: 1;
	}
`;

const Marker = React.memo((_props: { lat: number; lng: number }) => {
	return (
		<div>
			<PlaceIcon fontSize='large' style={{ color: '#5197d5' }} />
		</div>
	);
});

const PlanMap = (props: Props) => {
	const { place } = props;

	const defaults = {
		center: {
			lat: place!.geometry!.location.lat || 37.4870684,
			lng: place!.geometry!.location.lng || 126.8257101,
		},
		zoom: 15,
	};

	return (
		<Container>
			<div className='address'>{place.formatted_address}</div>
			<div>
				<GoogleMap bootstrapURLKeys={{ key: MAP_KEY }} {...defaults}>
					<Marker {...place!.geometry!.location} />
				</GoogleMap>
			</div>
		</Container>
	);
};

export default PlanMap;
