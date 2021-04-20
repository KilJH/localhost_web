import React from 'react';
import HostListItem from './HostListItem';
import styled from 'styled-components';
import { Host } from '../../interfaces';

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

const HostList = (props: Props) => {
	const { nearbyHosts } = props;
	console.log(nearbyHosts);
	return (
		<HostListContainer>
			{nearbyHosts.map((host) => (
				<HostListItem host={host} key={host.id} />
			))}
		</HostListContainer>
	);
};

export default HostList;
