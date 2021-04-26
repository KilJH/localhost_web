import { Grow, Slider } from '@material-ui/core';
import axios from 'axios';
import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import styled from 'styled-components';
import SERVER from '../../utils/url';
import Button from '../reuse/Button';

interface FilterProps {
	setNearbyHosts: Dispatch<SetStateAction<any>>;
	on?: boolean;
	onClose?: Function;
	coord: { lat: number; lng: number };
}

const FilterContainer = styled.div`
	position: absolute;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 0.25rem;
	padding: 1rem;
	z-index: 1;
	width: 240px;
	box-sizing: border-box;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
	& > div {
		display: flex;
		align-items: center;
		margin: 0.5rem 0;
		& > *:first-child {
			width: 33%;
		}
		& > *:last-child {
			width: 66%;
		}
	}
`;

const StyledSlider = styled(Slider)`
	&.MuiSlider-root {
		color: #5179d5;
	}
	& .MuiSlider-markLabel {
		font-size: 0.8em;
	}
`;

const HostFilter = (props: FilterProps) => {
	const { setNearbyHosts, on = true, onClose, coord } = props;
	const [distance, setDistance] = useState(4);

	useEffect(() => {
		// 거리가 변할 때마다 axios 요청 후 setNearbyHosts 해주기
		axios
			.post(`${SERVER}/api/host/nearbyList`, {
				latitude: coord.lat,
				longitude: coord.lng,
				distance: distance,
			})
			.then(res => {
				setNearbyHosts(res.data.nearbyhosts);
			});
	}, [distance]);

	const marks = [
		{ value: 1, label: '1km' },
		{ value: 8.5, label: '8.5km' },
		{ value: 16, label: '16km' },
	];

	return (
		<Grow in={on} timeout={200}>
			<div style={{ position: 'relative', top: '2.5rem', left: '-240px' }}>
				<FilterContainer>
					<div>
						<label>여행스타일</label>
						<input />
					</div>
					<div>
						<label>언어</label>
						<input />
					</div>
					<div>
						<label>거리</label>
						<StyledSlider
							defaultValue={4}
							min={1}
							step={0.5}
							max={16}
							marks={marks}
							valueLabelDisplay='auto'
							value={distance}
							onChange={(e: ChangeEvent<{}>, value: number) => {
								setDistance(value);
							}}
						/>
					</div>

					<Button
						onClick={() => {
							onClose();
						}}
						width='100%'
					>
						확인
					</Button>
				</FilterContainer>
			</div>
		</Grow>
	);
};

export default HostFilter;
