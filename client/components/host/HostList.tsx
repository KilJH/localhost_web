import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import HostListItem from './HostListItem';
import styled from 'styled-components';
import { Host } from '../../interfaces';
import TuneIcon from '@material-ui/icons/Tune';
import { Grow, Slider } from '@material-ui/core';
import Button from '../reuse/Button';
import axios from 'axios';
import SERVER from '../../utils/url';

interface Props {
	nearbyHosts: Host[];
	setNearbyHosts: Dispatch<SetStateAction<any>>;
	coord: { lat: number; lng: number };
}
interface FilterProps {
	setNearbyHosts: Dispatch<SetStateAction<any>>;
	on?: boolean;
	onClose?: Function;
	coord: { lat: number; lng: number };
}

const HostListContainer = styled.section`
	overflow-y: auto;
	overflow-x: hidden;
	font-size: 0.9em;
	flex: 1;
	& > div {
		border-bottom: 1px solid #aaa;
	}
	& > div:last-child {
		border-bottom: none;
	}
	& > div:nth-child(even) {
		background: #eee;
	}
`;

const SortContainer = styled.div`
	display: flex;
	margin: 0.5rem 0 0 0;
	& > button {
		flex: 1;
		font-size: 0.9em;
		border: none;
		display: inline-flex;
		align-items: center;
		&:hover {
			text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
		}
		&:active {
			color: #5197d5;
		}
		&.on {
			color: #5197d5;
			text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
		}
	}
`;

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

const Filter = (props: FilterProps) => {
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

const HostList = (props: Props) => {
	const { nearbyHosts, setNearbyHosts, coord } = props;
	const [sortOpt, setSortOpt] = useState({ property: 'distance', asc: true });
	const [filterOn, setFilterOn] = useState(false);

	const onOpenFilter = () => {
		setFilterOn(!filterOn);
	};
	const onCloseFilter = () => {
		setFilterOn(false);
	};

	const compareValue = (a, b) => {
		return sortOpt.asc ? a - b : b - a;
	};

	// 가벼운 Sort를 위한 매핑
	const mapped = nearbyHosts.map((el, i) => {
		switch (sortOpt.property) {
			case 'distance':
				return { index: i, value: el.place.geometry.distance };
			case 'rating':
				return { index: i, value: el.rating };
			case 'follower':
				return { index: i, value: el.follower };
			default:
				return { index: i, value: el.place.geometry.distance };
		}
	});

	// 매핑된 배열 Sort
	mapped.sort((a, b) => {
		return compareValue(a.value, b.value);
	});
	// Sort 결과에 따라 hostList 재배열
	const sortedHosts = mapped.map(el => {
		return nearbyHosts[el.index];
	});

	const onClickSort = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (e.currentTarget.value === sortOpt.property) {
			setSortOpt({ ...sortOpt, asc: !sortOpt.asc });
		} else {
			setSortOpt({ ...sortOpt, property: e.currentTarget.value });
		}
	};

	return (
		<HostListContainer>
			<SortContainer>
				<button
					onClick={onClickSort}
					value='distance'
					className={sortOpt.property === 'distance' ? 'on' : ''}
				>
					거리순{sortOpt.asc ? '▲' : '▼'}
				</button>
				<button
					onClick={onClickSort}
					value='rating'
					className={sortOpt.property === 'rating' ? 'on' : ''}
				>
					평점순{sortOpt.asc ? '▲' : '▼'}
				</button>
				<button
					onClick={onClickSort}
					value='follower'
					className={sortOpt.property === 'follower' ? 'on' : ''}
				>
					팔로워순{sortOpt.asc ? '▲' : '▼'}
				</button>
				<button onClick={onOpenFilter}>
					<TuneIcon />
					<span>필터</span>
				</button>
				<Filter
					on={filterOn}
					setNearbyHosts={setNearbyHosts}
					onClose={onCloseFilter}
					coord={coord}
				/>
			</SortContainer>
			{sortedHosts?.map(host => (
				<HostListItem host={host} key={host.id} />
			))}
		</HostListContainer>
	);
};

export default HostList;
