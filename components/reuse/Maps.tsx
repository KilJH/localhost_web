import React, { LegacyRef, useMemo, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MAP_KEY } from '../../client/utils/keys';
import HostIcon from '../host/HostIcon';
import { Host } from '../../interfaces';

interface Props {
	width?: string;
	height?: string;
	lat: number;
	lng: number;
	nearbyHosts?: Host[];
}

const Maps = (props: Props) => {
	const { lat, lng, width, height, nearbyHosts } = props;

	const mapRef: LegacyRef<GoogleMap> = useRef(null);

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: MAP_KEY,
	});

	const defaults = useMemo(
		() => ({
			mapContainerStyle: { width: '100%', height: '100%' },
			center: {
				lat: lat || 37.4870684,
				lng: lng || 126.8257101,
			},
			zoom: 15,
		}),
		[lat, lng],
	);

	const [markerShow, setMarkerShow] = useState(true);

	const onZoom = () => {
		const zoom = mapRef.current?.state.map?.getZoom() ?? 15;
		zoom > 12 ? setMarkerShow(true) : setMarkerShow(false);
	};
	// 줌 됐을때
	// 마커 표시

	return (
		<div style={{ width: width || '100%', height: height || '100%' }}>
			{isLoaded && (
				<GoogleMap {...defaults} onZoomChanged={onZoom} ref={mapRef}>
					{/* 해당 위치 */}
					{markerShow && <Marker position={{ lat, lng }} />}

					{/* 호스트 위치 */}
					{nearbyHosts?.map(host => (
						<HostIcon
							host={host}
							isShow={markerShow}
							key={host.id}
							position={{ ...host.place!.geometry!.location }}
						/>
					))}
				</GoogleMap>
			)}
		</div>
	);
};

export default React.memo(Maps);
