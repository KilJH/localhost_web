import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import complexityCheck from '../../utils/complexityCheck';

interface Props {
	value: string | number;
	width?: string;
}

const CpxBox = styled.div<{ color: string }>`
	margin: 0 2px;
	height: 0.25em;
	flex: 1;
	background-color: ${props => props.color};
	transition: all 0.3s ease;
`;

const FlexDiv = styled.div<{ width?: string }>`
	display: flex;
	width: ${props => props.width || '100%'};
	align-items: center;
	animation: fadeIn 0.3s ease;

	& span {
		font-size: 0.8em;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

const CpxBarometer = (props: Props) => {
	const { value, width } = props;
	const [level, setLevel] = useState(0);

	useEffect(() => {
		setLevel(complexityCheck(value as string));
	}, [value]);
	if (level === 0) {
		return <div></div>;
	}
	if (level < 2) {
		return (
			<FlexDiv width={width}>
				<span>비밀번호 복잡도: 낮음</span>
				<CpxBox color='#ee6055' />
				<CpxBox color='white' />
				<CpxBox color='white' />
			</FlexDiv>
		);
	} else if (level < 4) {
		return (
			<FlexDiv width={width}>
				<span>비밀번호 복잡도: 보통</span>
				<CpxBox color='#fdcb6e' />
				<CpxBox color='#fdcb6e' />
				<CpxBox color='white' />
			</FlexDiv>
		);
	} else {
		return (
			<FlexDiv width={width}>
				<span>비밀번호 복잡도: 높음</span>
				<CpxBox color='#5197D5' />
				<CpxBox color='#5197D5' />
				<CpxBox color='#5197D5' />
			</FlexDiv>
		);
	}
};

export default CpxBarometer;
