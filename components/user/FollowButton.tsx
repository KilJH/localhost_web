import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { UserStateContext } from '../../context/user';

interface Props {
	userId: number;
	initialFollowed?: boolean;
	onClickHandler?: Function;
}

// 실제 DOM에 followed Props가 전달되는 것을 방지하기 위해 prefix $를 붙여줌
const Btn = styled(Button)<{ $followed }>`
	font-size: 0.75em !important;
	background-color: ${props =>
		props.$followed ? '#c5c7c9' : '#5197D5'} !important;
	color: ${props =>
		props.$followed ? 'rgba(0,0,0,0.87)' : 'white'} !important;
	border: none;
	width: 8em;
	box-shadow: none !important;
	&:active {
		background-color: ${props => (props.$followed ? '#a5a7a9' : '#4187C5')};
		box-shadow: 0px 2px 3px -2px rgba(0, 0, 0, 0.2),
			0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 3px 12px 2px rgba(0, 0, 0, 0.12) !important;
	}
	&:hover {
		background-color: ${props =>
			props.$followed ? '#a5a7a9' : '#4187C5'} !important;
	}
`;

const FollowButton = (props: Props) => {
	const { userId, initialFollowed, onClickHandler } = props;
	const currentUser = useContext(UserStateContext);
	const [followState, setFollowState] = useState(initialFollowed || false);
	useEffect(() => {
		axios
			.post(`/api/user/follow_check`, {
				userId: userId,
				followerId: currentUser.id,
			})
			.then(res => setFollowState(res.data.isFollowed));
	}, [followState]);

	const onClick = async () => {
		try {
			const res = await axios.post(`/api/user/follow`, {
				userId,
				followerId: currentUser.id,
			});
			if (res.data.success) setFollowState(!followState);
		} catch (err) {
			return console.log(err);
		}
		if (onClickHandler) onClickHandler();
	};

	return (
		<Btn $followed={followState} onClick={onClick} variant='contained'>
			{followState ? 'Followed' : 'Follow'}
		</Btn>
	);
};

export default React.memo(FollowButton);
