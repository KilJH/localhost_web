import React, { ReactNode, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../../client/hooks/useInput';
import Button from '../../reuse/Button';
import Input from '../../reuse/Input';
import { io, Socket } from 'socket.io-client';
import { UserStateContext } from '../../../context/user';
import axios from 'axios';
import SERVER from '../../../client/utils/url';

// 1. 채팅을 하면 기존 메세지 배열이 삭제되는 이슈
//    - 원인: 소켓에 이벤트를 등록해주는 과정에서 등록하는 그 당시의 값을 기준으로 참조하기 때문에 빈배열에 추가가 되었던 것
//    - 해결: 소켓과 메세지배열이 변할 때마다 새로 이벤트를 등록하는 방향으로 설정
// 2. 채팅횟수가 일정 넘어가면 지연시간이 생기는 이슈
//    - 원인: 소켓에 등록되는 이벤트리스너의 중첩
//    - 해결: cleanup함수로 이벤트를 등록시키기 전(socket과 메세지배열이 변할 때마다) 기존 리스너를 삭제해줌
// 3. 내가 보낸 메세지도 다른 사람이 보낸 메세지처럼 받게되는 이슈
//    - 원인: 소켓서버에 emit을 하면 그 서버가 모든 유저에게 다시 emit을 해준다. 그러면 그 메세지는 다시 발신자에게 돌아온다.
//    - 해결: 서버에 보내는 데이터에 유저정보를 담아보낸다. 다시 데이터를 받게되면 로그인된 유저와의 id값 비교를 통해
//           내가 보낸 메세지면 오른쪽에 아니면 왼쪽에 표시

interface Props {
	// 상대방 user 객체(nickname, id, photo)
	loadMessages: Array<Object>;
	roomId: number;
}

interface TimeProps {
	createTime: string;
}

const ChatRoomContainer = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	& header {
	}
	& .messageBox {
		flex: 1;
		background: #b6c6d7;
		border-bottom: 1px solid #aaa;
		overflow: auto;
		padding: 1em;
	}
	& > form {
		display: flex;
		padding: 1em 0.5em;
		& input {
			flex: 1;
			font-size: 1em;
		}
		& button {
			margin-left: 1em;
		}
	}
`;

const ChatContainer = styled.div`
	padding: 0.75em 1em;
	& .message {
		padding: 0.5em 1em;
		border-radius: 1rem;
		opacity: 0.9;
	}
`;

const OppositeChatContainer = styled(ChatContainer)<TimeProps>`
	text-align: left;
	& .message {
		background: #aaa;
		color: black;
	}
	&::after {
		content: '${(props: TimeProps) => props.createTime?.slice(11, 16) || ''}';
		margin: 0 1em;
		font-size: 0.75em;
		font-weight: 600;
		color: #666;
	}

	& + &::after {
		/* 시간이 같으면 '' 다르면 시간 */
		content: '';
	}
`;

const MyChatContainer = styled(ChatContainer)<TimeProps>`
	text-align: right;
	& .message {
		background: #5197d5;
		color: #eee;
	}
	&::before {
		content: '${(props: TimeProps) => props.createTime?.slice(11, 16) || ''}';
		margin: 0 1em;
		font-size: 0.75em;
		font-weight: 600;
		color: #666;
	}

	& + &::before {
		content: '';
	}
`;

const OppositeChat = ({
	children,
	createTime,
}: {
	children: ReactNode;
	createTime: string;
}) => (
	<OppositeChatContainer createTime={createTime}>
		<span className='message'>{children}</span>
	</OppositeChatContainer>
);
const MyChat = ({
	children,
	createTime,
}: {
	children: ReactNode;
	createTime: string;
}) => (
	<MyChatContainer createTime={createTime}>
		<span className='message'>{children}</span>
	</MyChatContainer>
);

const ChatRoom = (props: Props) => {
	const { loadMessages, roomId } = props;
	const chatInput = useInput('');
	const currentUser = useContext(UserStateContext);
	const [socket, setSocket] = useState<Socket>();
	const [messages, setMessages] = useState<any[]>(loadMessages);
	const receiveMessage = (message: any) => {
		setMessages([...messages, message]);
	};
	useEffect(() => {
		setSocket(io(`/`, { transports: ['websocket'] }));
	}, []);

	useEffect(() => {
		setMessages(loadMessages);
	}, [loadMessages]);

	useEffect(() => {}, [messages]);

	useEffect(() => {
		if (socket) {
			socket.on('message', data => {
				receiveMessage(data);
			});
		}

		return () => {
			if (socket) {
				socket.off('message');
			}
		};
	}, [socket, messages]);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (chatInput.value === '') return;
		const submitData = {
			userId: currentUser.id,
			message: chatInput.value,
		};
		await axios.post(`${SERVER}/api/message/write`, {
			messageRoomId: roomId,
			userId: submitData.userId,
			text: submitData.message,
		});
		socket!.emit('message', submitData);

		chatInput.setValue('');
	};

	return (
		<ChatRoomContainer>
			<header></header>
			<div className='messageBox'>
				{messages.map((message, i) => {
					return message.userId === currentUser.id ? (
						<MyChat key={i} createTime={message.createTime}>
							{message.message}
						</MyChat>
					) : (
						<OppositeChat key={i} createTime={message.createTime}>
							{message.message}
						</OppositeChat>
					);
				})}
			</div>
			<form onSubmit={onSubmit}>
				<Input textAlign='left' {...chatInput} />
				<Button type='submit'>전송</Button>
			</form>
		</ChatRoomContainer>
	);
};

export default ChatRoom;
