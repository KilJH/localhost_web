import React from 'react';
import GoogleMap from 'google-map-react';
import { MAP_KEY } from '../../utils/keys';
import PersonIcon from '@material-ui/icons/Person';
import HostIcon from '../host/HostIcon';
import { Host } from '../../interfaces';
import { Place } from '@material-ui/icons';

interface Props {
	width?: string;
	height?: string;
	lat: number;
	lng: number;
	nearbyHosts?: Host[];
}

const Marker = (props: { lat: number; lng: number }) => {
	return (
		<div>
			{/* hover
				theme에 따른 색상 변화
			*/}
			<Place fontSize='large' style={{ color: '#5197d5' }} />
		</div>
	);
};

const Maps = (props: Props) => {
	const { lat, lng, width, height, nearbyHosts } = props;
	const defaults = {
		center: {
			lat: lat || 37.4870684,
			lng: lng || 126.8257101,
		},
		zoom: 15,
	};
	return (
		<div style={{ width: width || '100%', height: height || '100%' }}>
			<GoogleMap bootstrapURLKeys={{ key: MAP_KEY }} {...defaults}>
				{/* 해당 위치 */}
				<Marker lat={lat} lng={lng} />

				{/* 호스트 위치 */}
				{nearbyHosts.map((host) => (
					<HostIcon
						host={host}
						lat={host.place.geometry.location.lat}
						lng={host.place.geometry.location.lng}
					/>
				))}
			</GoogleMap>
		</div>
	);
};

export default Maps;
