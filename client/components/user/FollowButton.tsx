import axios from 'axios';
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import SERVER from '../../utils/url';
import Router from 'next/router';
import { Button } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core';
import { User } from '../../interfaces/index';
import { UserStateContext } from '../../context/user';

interface Props {
	userId: number;
	isFollowed: boolean;
}

const Btn = styled(Button)<{ isFollowed }>`
	font-size: 0.75em !important;
	background-color: ${props =>
		props.isFollowed ? '#c5c7c9' : '#5197D5'} !important;
	color: ${props =>
		props.isFollowed ? 'rgba(0,0,0,0.87)' : 'white'} !important;
	border: none;
	width: 8em;
	box-shadow: none !important;
	&:active {
		background-color: ${props => (props.isFollowed ? '#a5a7a9' : '#4187C5')};
		box-shadow: 0px 2px 3px -2px rgba(0, 0, 0, 0.2),
			0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 3px 12px 2px rgba(0, 0, 0, 0.12) !important;
	}
	&:hover {
	}
`;

const FollowButton = (props: Props) => {
	const { userId, isFollowed } = props;

	const [followState, setFollowState] = useState(isFollowed);

	const currentUser = useContext(UserStateContext);

	const onClick = async (e: React.MouseEvent) => {
		// 서버 api
		try {
			const res = await axios.post(`${SERVER}/api/user/follow`, {
				userId,
				followerId: currentUser.id,
			});
			setFollowState(!followState);
		} catch (err) {
			return console.log(err);
		}
	};

	return (
		<Btn isFollowed={followState} onClick={onClick} variant='contained'>
			{followState ? 'Followed' : 'Follow'}
		</Btn>
	);
};

export default FollowButton;
