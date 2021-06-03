import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useContext } from 'react';
import { useAsync } from 'react-async';
import styled from 'styled-components';
import { UserStateContext } from '../../../context/user';
import UserPhoto from '../../user/UserPhoto';
import Link from 'next/link';

// interface Props {}

interface ItemProps {
	item: {
		roomId: number;
		nickname: string;
		photo: string;
		hostId: number;
		userId: number;
		// 최근대화?
		recentMessage: { message: string; createTime: string };
	};
	currentUser: {
		id: number;
	};
}

const getRoomList = async ({ userId }: { userId: number }) => {
	const res = await axios.post(`/api/message/room/list`, {
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
			word-break: break-all;

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

const ChatRoomItem = ({ item }: ItemProps) => {
	const { roomId, nickname, photo, recentMessage } = item;

	const addZero = num => {
		return `0${num}`;
	};
	const formatDate = (date: string) => {
		if (date.indexOf(':') === -1) return null;
		else {
			const hour = Number(date.split(':')[0]);
			const min = Number(date.split(':')[1]);

			return `${hour < 10 ? addZero(hour) : hour}:${
				min < 10 ? addZero(min) : min
			}`;
		}
	};
	// 만약 열고 있는데 문자 오면 보여지게
	// const [socket, setSocket] = useState<Socket>();
	// const [recent, setRecent] = useState(recentMessage);
	// useEffect(() => {
	// 	setSocket(io(`/`, { transports: ['websocket'] }));
	// }, []);
	// // 방 입장 (소켓 생성 시)
	// useEffect(() => {
	// 	if (socket) {
	// 		socket.emit('join', roomId);
	// 	}
	// 	return () => {
	// 		if (socket) {
	// 			socket.off('message');
	// 			socket.on('message', data => {
	// 				setRecent({ message: data.message, createTime: data.createTime });
	// 			});
	// 		}
	// 	};
	// }, [socket]);

	return (
		<Link href='/messages/[id]' as={`/messages/${roomId}`}>
			<ItemContainer>
				<UserPhoto src={photo} margin='0' width={4} />
				<div className='message'>
					{' '}
					<div>
						{nickname}#{roomId}
					</div>
					<div>{recentMessage.message || '메세지가 없습니다.'}</div>
				</div>
				<div className='time'>{formatDate(recentMessage.createTime)}</div>
			</ItemContainer>
		</Link>
	);
};

const ChatRoomList = () => {
	const currentUser = useContext(UserStateContext);

	const {
		data: roomList,
		error,
		isLoading,
	} = useAsync({
		_promiseFn: getRoomList,
		// 자동으로 뭐 해쓴ㄴ데...
		get promiseFn() {
			return this._promiseFn;
		},
		set promiseFn(value) {
			this._promiseFn = value;
		},
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
				{(roomList as Array<any>).length ? (
					(roomList as Array<any>)!.map(room => (
						<ChatRoomItem item={room} currentUser={currentUser} />
					))
				) : (
					<div style={{ textAlign: 'center' }}>채팅 중인 상대가 없습니다.</div>
				)}
			</ul>
		</ListContainer>
	);
};

export default ChatRoomList;
