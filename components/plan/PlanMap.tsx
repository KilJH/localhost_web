import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Place } from '../../interfaces/index';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
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

const PlanMap = (props: Props) => {
	const { place } = props;

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: MAP_KEY,
	});

	const defaults = useMemo(
		() => ({
			mapContainerStyle: { width: '100%', height: '100%' },
			center: {
				...place!.geometry!.location,
			},
			zoom: 15,
		}),
		[],
	);

	return (
		<Container>
			<div className='address'>{place.formatted_address}</div>
			<div>
				{isLoaded && (
					<GoogleMap {...defaults}>
						<Marker position={{ ...place!.geometry!.location }} />
					</GoogleMap>
				)}
			</div>
		</Container>
	);
};

export default PlanMap;
