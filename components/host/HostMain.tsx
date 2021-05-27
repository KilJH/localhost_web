import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Maps from '../../components/reuse/Maps';
import SearchPlace from '../../components/search/SearchPlace';
import { Host, Place } from '../../interfaces';
import styled from 'styled-components';
import HostList from '../../components/host/HostList';
import { UserStateContext } from '../../context/user';

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
	const [place, setPlace] = useState<Place>();

	const [coord, setCoord] = useState({ lat: 0, lng: 0 });
	const [nearbyHosts, setNearbyHosts] = useState<Host[]>([]);
	const [filteredHosts, setFilteredHosts] = useState<Host[]>([]);

	const [distance, setDistance] = useState(4);

	const currentUser = useContext(UserStateContext);

	// 지역이 바뀌면 위,경도 가져오기
	useEffect(() => {
		if (place) {
			setCoord({ ...place!.geometry!.location });
		}
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
			.post(`/api/host/nearByList`, {
				latitude: coord.lat,
				longitude: coord.lng,
				country: currentUser.nationality,
				distance: distance,
			})
			.then(res => {
				setNearbyHosts(res.data.nearbyhosts);
			});
	}, [coord]);

	useEffect(() => {
		// 거리가 변할 때마다 axios 요청 후 setNearbyHosts 해주기
		axios
			.post(`/api/host/nearbyList`, {
				latitude: coord.lat,
				longitude: coord.lng,
				distance: distance,
				country: currentUser.nationality,
			})
			.then(res => {
				setNearbyHosts(res.data.nearbyhosts);
			});
	}, [distance]);

	useEffect(() => {
		setFilteredHosts(nearbyHosts);
	}, [nearbyHosts]);

	return (
		<Container>
			<div>
				<SearchPlace setPlace={setPlace} />
				<HostList
					origin={nearbyHosts}
					nearbyHosts={filteredHosts}
					setNearbyHosts={setFilteredHosts}
					coord={coord}
					distance={distance}
					setDistance={setDistance}
				/>
			</div>
			<div>
				<Maps {...coord} nearbyHosts={nearbyHosts} />
			</div>
		</Container>
	);
};

export default HostMain;
