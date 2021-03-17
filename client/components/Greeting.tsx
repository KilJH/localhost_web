import { Button } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface Props {}

const MainImg = styled.img`
	height: 80vh;
	width: 100%;

	object-fit: cover;

	display: block;
	position: absolute;
	/* top: 0; */
	left: 0;
	z-index: -1;
`;

const Introduction = styled.div`
	height: 80vh;
	width: 100%;

	display: flex;
	/* flex-direction: column; */
	align-items: center;

	color: white;
	margin-bottom: 1rem;

	& > div {
		flex: 1;
	}

	& > * > h1 {
		font-size: 2.5rem;
		font-weight: 900;
		margin: 0.5rem 0;
	}
`;

const Greeting = (props: Props) => {
	return (
		<div>
			<MainImg src="/img/backgrounds/background1.jpg"></MainImg>
			<Introduction>
				<div>
					<h1>한 번의 클릭으로 손쉽게 여행해보세요</h1>
					<Link href="/plans">
						<Button variant="contained" size="small">
							베스트 플랜 보기
						</Button>
					</Link>
				</div>
			</Introduction>
		</div>
	);
};

export default Greeting;
