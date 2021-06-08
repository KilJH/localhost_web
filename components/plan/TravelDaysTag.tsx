import React from 'react';
import styled from 'styled-components';

interface Props {
	sleepDays: number;
	travelDays: number;
}

const Tag = styled.span`
	color: #2d3436;
	border: 1px solid #2d3436;
	padding: 0 0.25rem;
`;

const TravelDaysTag = (props: Props) => {
	const { sleepDays, travelDays } = props;
	return (
		<Tag>
			{sleepDays === 0 && travelDays === 1
				? '당일치기'
				: sleepDays === 0
				? `무박${travelDays}일`
				: `${sleepDays}박${travelDays}일`}
		</Tag>
	);
};

export default React.memo(TravelDaysTag);
