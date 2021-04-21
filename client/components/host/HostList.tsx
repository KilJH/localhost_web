import React, { useEffect, useState } from 'react';
import HostListItem from './HostListItem';
import styled from 'styled-components';
import { Host } from '../../interfaces';
import { Button } from '@material-ui/core';

interface Props {
	nearbyHosts: Host[];
}

const HostListContainer = styled.section`
	overflow-y: auto;
	font-size: 0.9em;
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
	margin: 0.5rem 0;
`;

const HostList = (props: Props) => {
	const { nearbyHosts } = props;
	const [sortOpt, setSortOpt] = useState({ property: 'distance', asc: true });
	// const [sortedHosts, setSortedHosts] = useState(nearbyHosts);

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
	const sortedHosts = mapped.map((el) => {
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
				<Button onClick={onClickSort} value='distance'>
					거리순{sortOpt.asc ? '▲' : '▼'}
				</Button>
				<Button onClick={onClickSort} value='rating'>
					평점순{sortOpt.asc ? '▲' : '▼'}
				</Button>
				<Button onClick={onClickSort} value='follower'>
					팔로워순{sortOpt.asc ? '▲' : '▼'}
				</Button>
			</SortContainer>
			{sortedHosts?.map((host) => (
				<HostListItem host={host} key={host.id} />
			))}
		</HostListContainer>
	);
};

export default HostList;
