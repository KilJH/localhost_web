import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Maps from '../../components/reuse/Maps';
import SearchPlace from '../../components/search/SearchPlace';
import { Host, Place } from '../../interfaces';
import styled from 'styled-components';
import SERVER from '../../client/utils/url';
import HostList from '../../components/host/HostList';

const Container = styled.div`
	display: flex;
	width: 100%;
	height: 85vh;
	& > div {
		padding: 0.5rem;
	}

	& > div:first-child {
		flex: 1;
		min-width: 350px;
		display: flex;
		flex-direction: column;
	}
	& > div:nth-child(2) {
		flex: 2;
	}
`;

const HostMain = () => {
	const [place, setPlace] = useState<Place>({
		name: '',
		formatted_address: '',
		geometry: { location: { lat: 0, lng: 0 } },
	});

	const [coord, setCoord] = useState({ lat: 0, lng: 0 });
	const [nearbyHosts, setNearbyHosts] = useState<Host[]>([]);
	const [filteredHosts, setFilteredHosts] = useState<Host[]>([]);

	// 지역이 바뀌면 위,경도 가져오기
	useEffect(() => {
		setCoord({ ...place!.geometry!.location });
	}, [place]);

	// 첫 로딩 때 GPS 읽어서 현재위치로
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				setCoord({
					lat: position.coords.latitude || 0,
					lng: position.coords.longitude || 0,
				});
			});
		}
	}, []);

	// 위,경도 바뀌면 api요청 보내서 근처 호스트 목록 가져오기
	useEffect(() => {
		axios
			.post(`${SERVER}/api/host/nearByList`, {
				latitude: coord.lat,
				longitude: coord.lng,
			})
			.then(res => {
				setNearbyHosts(res.data.nearbyhosts);
			});
	}, [coord]);

	useEffect(() => {
		setFilteredHosts(nearbyHosts);
	}, [nearbyHosts]);

	return (
		<Container>
			<div>
				<SearchPlace setPlace={setPlace} />
				<HostList
					origin={nearbyHosts}
					setOrigin={setNearbyHosts}
					nearbyHosts={filteredHosts}
					setNearbyHosts={setFilteredHosts}
					coord={coord}
				/>
			</div>
			<div>
				<Maps {...coord} nearbyHosts={nearbyHosts} />
			</div>
		</Container>
	);
};

export default HostMain;
