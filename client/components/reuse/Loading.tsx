import { CircularProgress } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

interface Props {}

const LoadingContainer = styled.div`
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;

	position: fixed;
	top: 0;
	left: 0;
`;

const Loading = (props: Props) => {
	return (
		<LoadingContainer>
			<CircularProgress />
		</LoadingContainer>
	);
};

export default Loading;
