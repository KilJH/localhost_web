import React, { Dispatch, SetStateAction, useState } from 'react';
import HostListItem from './HostListItem';
import styled from 'styled-components';
import { Host } from '../../interfaces';
import TuneIcon from '@material-ui/icons/Tune';
import HostFilter from './HostFilter';

interface Props {
	origin: Host[];
	nearbyHosts: Host[];
	setNearbyHosts: Dispatch<SetStateAction<Host[]>>;
	coord: { lat: number; lng: number };
	distance: number;
	setDistance: Dispatch<SetStateAction<number>>;
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

const HostList = (props: Props) => {
	const { nearbyHosts } = props;
	const [sortOpt, setSortOpt] = useState({ property: 'distance', asc: true });
	const [filterOn, setFilterOn] = useState(false);

	const onOpenFilter = () => {
		setFilterOn(!filterOn);
	};
	// const onCloseFilter = () => {
	// 	setFilterOn(false);
	// };

	const compareValue = (a, b) => {
		return sortOpt.asc ? a - b : b - a;
	};

	// 가벼운 Sort를 위한 매핑
	const mapped = nearbyHosts.map((el, i) => {
		switch (sortOpt.property) {
			case 'distance':
				return { index: i, value: el!.place!.geometry!.distance };
			case 'rating':
				return { index: i, value: el.rating };
			case 'follower':
				return { index: i, value: el.follower };
			default:
				return { index: i, value: el!.place!.geometry!.distance };
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
				<HostFilter onShow={filterOn} {...props} />
			</SortContainer>
			{sortedHosts?.map(host => (
				<HostListItem host={host} key={host.id} />
			))}
		</HostListContainer>
	);
};

export default HostList;
