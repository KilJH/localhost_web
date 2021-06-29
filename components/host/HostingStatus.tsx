import React from 'react';
import styled from 'styled-components';

interface Props {
	status: number;
}

const StatusSpan = styled.span<{ color?: string }>`
	display: inline-block;
	padding: 0.25rem 0.5rem;
	color: ${props => props.color || 'black'};
	border: 2px solid ${props => props.color || 'black'};
	font-weight: 600;
	font-size: 0.8em;
`;

const HostingStatus = ({ status }: Props) => {
	switch (status) {
		case 0:
			return <StatusSpan>대기 중</StatusSpan>;
		case 1:
			return <StatusSpan color='#5197d5'>승낙</StatusSpan>;
		case 2:
			return <StatusSpan color='#e74c3c'>거절</StatusSpan>;
		case 3:
			return <StatusSpan color='#e74c3c'>취소</StatusSpan>;
		case 4:
			return <StatusSpan>완료</StatusSpan>;
		case 5:
			return <StatusSpan color='#e74c3c'>장소 미설정</StatusSpan>;
		case 6:
			return <StatusSpan color='#e74c3c'>시간초과</StatusSpan>;
		default:
			return <StatusSpan>대기 중</StatusSpan>;
	}
};

export default HostingStatus;
