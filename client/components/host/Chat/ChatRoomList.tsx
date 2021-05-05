import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useContext } from 'react';
import { useAsync } from 'react-async';
import styled from 'styled-components';
import { UserStateContext } from '../../../context/user';
import SERVER from '../../../utils/url';
import UserPhoto from '../../user/UserPhoto';

interface Props {}

interface ItemProps {
	item: {
		id: number;
		nickname: string;
		photo: string;
		// 최근대화?
	};
}

const getRoomList = async ({ userId }) => {
	const res = await axios.post(`${SERVER}/api/message/room/list`, {
		userId,
	});
	return res.data.roomList;
};

const ListContainer = styled.div`
	width: 20rem;
	padding: 2rem 0;

	& > h2 {
		text-align: center;
		margin: 0;
	}

	& > ul {
		padding: 0;
	}
`;

const ItemContainer = styled.li`
	display: flex;
	/* align-items: center; */
	height: 4rem;
	padding: 0.5em 1rem;
	background: white;

	transition: all 0.3 ease;
	& .message {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 0.5em;
		& > *:first-child {
			font-weight: 600;
			margin: 0.25em 0;
		}
		& > *:nth-child(2) {
			height: 2.5em;
			color: #666;
			font-size: 0.8em;
			line-height: 1.25em;

			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
	& .time {
		margin: 0.25em 0;
		color: #666;
		font-size: 0.8em;
	}

	&:hover {
		opacity: 0.9;
		background: #eee;
		cursor: pointer;
	}
`;

const ChatRoomItem = (props: ItemProps) => {
	const { id, nickname, photo } = props.item;
	return (
		<ItemContainer>
			<UserPhoto src={photo} margin='0' width={4} />
			<div className='message'>
				{' '}
				<div>{nickname}</div>
				<div>
					최근 대화최근 대화최근 대화최근 대화최근 대화최근 대화최근 대화최근
					대화최근 대화 최근 대화최근 대화최근 대화최근 대화최근 대화
				</div>
			</div>
			<div className='time'>날짜</div>
		</ItemContainer>
	);
};

const ChatRoomList = (props: Props) => {
	const currentUser = useContext(UserStateContext);

	const { data: roomList, error, isLoading } = useAsync({
		promiseFn: getRoomList,
		userId: currentUser.id,
	});

	if (isLoading) return <CircularProgress />;
	if (error)
		return (
			<div style={{ fontSize: '0.5em', color: '#e74c3c' }}>
				채팅방 목록을 가져오지 못했습니다.
			</div>
		);
	if (!roomList) return null;

	return (
		<ListContainer>
			<h2>채팅목록</h2>
			<ul>
				{roomList.map(room => (
					<ChatRoomItem item={room} />
				))}
			</ul>
		</ListContainer>
	);
};

export default ChatRoomList;
