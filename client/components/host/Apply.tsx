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
	/* margin-bottom: 1rem; */

	& > div {
		flex: 1;
	}

	& > * > h1 {
		font-size: 2.5rem;
		font-weight: 900;
		margin: 0.5rem 0;
	}
`;

const Apply = (props: Props) => {
	return (
		<div>
			<MainImg src="/img/backgrounds/background2.jpeg"></MainImg>
			<Introduction></Introduction>
		</div>
	);
};

export default Apply;
