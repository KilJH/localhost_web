import React, {
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import styled from 'styled-components';
import { useInput } from '../../../client/hooks/useInput';
import Button from '../../reuse/Button';
import Input from '../../reuse/Input';
import { io, Socket } from 'socket.io-client';
import { UserStateContext } from '../../../context/user';
import axios from 'axios';
import { Place, User } from '../../../interfaces';
import MenuIcon from '@material-ui/icons/Menu';
import { Fade, IconButton, Menu, MenuItem, Modal } from '@material-ui/core';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import SearchPlace from '../../search/SearchPlace';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import Router from 'next/router';
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
	loadMessages: Array<Object>;
	roomId: number;
	opponent: User;
	applicationId: number;
}

interface InputProps {
	isVisible?: boolean;
}

interface TimeProps {
	createTime?: string;
}
interface ScrollProps {
	scrollDisplay?: string;
}

const ChatRoomContainer = styled.div<ScrollProps>`
	height: 80vh;
	display: flex;
	flex-direction: column;
	border: 1px solid #ddd;
	& header {
		position: sticky;
		background: white;

		& div {
			display: flex;
			& h4 {
				margin: 0.75em auto 0.75em 2em;
				color: rgba(33, 33, 33, 0.8);
			}
			& button {
				width: 1em;
				height: 1em;
				margin: auto 0.25em;
				&.menu {
					margin-right: 0.5em;
				}
			}
		}
	}
	& .messageBox {
		flex: 1;
		background: #b6c6d7;
		border-bottom: 1px solid #aaa;
		padding: 1em;
		overflow-x: hidden;
		overflow-y: auto;
		& p {
			text-align: center;
			margin: 1.5em 1em;
			font-size: 0.9em;
			font-weight: 600;
			color: rgba(33, 33, 33, 0.7);
		}
		&::-webkit-scrollbar {
			width: 10px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: gray;
			border-radius: 3.5px;
			&:hover {
				background: rgba(33, 33, 33, 0.75);
			}
		}
		& .popup {
			position: sticky;
			overflow: auto;
			bottom: 0em;
			display: flex;
			text-align: center;
			overflow-x: hidden;
			& .newMessage {
				display: flex;
				align-items: center;
				width: 100%;
				height: 3em;
				border-radius: 12px;
				background: rgba(33, 33, 33, 0.75);
				color: rgba(255, 255, 255, 0.8);
				cursor: pointer;
				& p {
					display: inline-block;
					width: 93%;
					margin: 0;
					color: rgba(255, 255, 255, 0.8);
				}
				& svg {
					width: 7%;
				}
			}
			& .toBottom {
				display: inline-block;
				width: 3em;
				height: 3em;
				border-radius: 100%;
				margin-left: auto;
				background: rgba(33, 33, 33, 0.75);
				color: rgba(255, 255, 255, 0.8);
				cursor: pointer;
				& svg {
					margin: 0.4em;
				}
			}
		}
	}

	& > form {
		display: flex;
		padding: 1em 0.5em;
		align-items: center;
		& textarea {
			flex: 1;
			font-size: 1em;
			border: none;
			resize: none;
			max-height: 15em;
			cursor: auto;
			font-family: inherit;
			&:focus {
				outline: none;
			}
			&::-webkit-scrollbar {
				display: ${(props: ScrollProps) => props.scrollDisplay};
				width: 10px;
			}
			&::-webkit-scrollbar-thumb {
				background-color: gray;
				border-radius: 3.5px;
				&:hover {
					background: rgba(33, 33, 33, 0.75);
				}
			}
			&::-webkit-scrollbar-track {
				border-radius: 3.5px;
				background-color: #eee;
			}
		}
		& button {
			height: 3em;
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
		white-space: pre;
		display: inline-block;
		text-align: left;
	}
`;

const OppositeChatContainer = styled(ChatContainer)<TimeProps>`
	text-align: left;
	& .message {
		background: #aaa;
		color: black;
	}
	&::after {
		content: '${(props: TimeProps) => props.createTime || ''}';
		margin: 0 1em;
		font-size: 0.75em;
		font-weight: 600;
		color: #666;
	}
`;
const MyChatContainer = styled(ChatContainer)<TimeProps>`
	text-align: right;
	& .message {
		background: #5197d5;
		color: #eee;
	}
	&::before {
		content: '${(props: TimeProps) => props.createTime || ''}';
		margin: 0 1em;
		font-size: 0.75em;
		font-weight: 600;
		color: #666;
	}
`;
const PlaceInput = styled(Input)<InputProps>`
	opacity: 0.7;
	background: rgba(33, 33, 33, 0.1);
	display: '${(props: InputProps) => (props.isVisible ? 'default' : 'none')}';

	& :hover {
		border-width: 1px;
		border-color: #ddd;
	}
`;
const StyledModal = styled(Modal)`
	display: flex;
	align-items: center;
	justify-content: center;

	& .searchForm {
		width: 80vw;
		max-width: 800px;
		background: rgba(255, 255, 255, 0.9);
		padding: 1rem;
		border-radius: 0.25rem;
		outline: 0;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3), -2px -2px 8px rgba(0, 0, 0, 0.3);
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
	const { loadMessages, roomId, opponent, applicationId } = props;
	const chatInput = useInput('');
	const currentUser = useContext(UserStateContext) as User;
	const [socket, setSocket] = useState<Socket>();
	const [messages, setMessages] = useState<any[]>(loadMessages);

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	// 새로운 메세지
	const [newMsgDisplay, setNewMsgDisplay] = useState('none');
	const [newMessage, setNewMessage] = useState('');
	// 아래로 버튼
	const [toBottomDisplay, setToBottomDisplay] = useState('none');
	// 메뉴
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const options =
		currentUser.isHost === 1
			? ['팔로우', '신고', '채팅 나가기', '호스팅 완료']
			: ['팔로우', '신고', '채팅 나가기'];
	const open = Boolean(anchorEl);
	// 위치
	const [place, setPlace] = useState<Place>();
	const [placeInputOpen, setPlaceInputOpen] = useState(place ? true : false);
	const [placeOpen, setPlaceOpen] = useState(false);
	// 스크롤
	const scrollRef = useRef<HTMLDivElement>(null);
	const ref = scrollRef.current;
	const [scrollDisplay, setScrollDisplay] = useState('none');

	// 최초 접속 시
	useEffect(() => {
		// 소켓 생성
		setSocket(io(`/`, { transports: ['websocket'] }));
		// 스크롤 다운
		if (ref) {
			const { scrollHeight, clientHeight } = ref;
			ref.scrollTop = scrollHeight - clientHeight;
		}
	}, []);

	// 방 입장 (소켓 생성 시)
	useEffect(() => {
		// 스크롤 다운
		if (ref) {
			const { scrollHeight, clientHeight } = ref;
			ref.scrollTop = scrollHeight - clientHeight;
		}
		if (socket) {
			socket.emit('join', roomId);
		}
		return () => {
			if (socket) {
				socket.off('message');
			}
		};
	}, [socket]);

	// 방 입장 (roomId 변경 시)
	useEffect(() => {
		if (socket) {
			socket.emit('join', roomId);
		}
	}, [roomId]);

	// 메세지 생성
	useEffect(() => {
		setMessages(loadMessages);
	}, [loadMessages]);

	// 소켓, 메세지 변경 시 메세지 수신
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

	// 채팅 내용 갱신 시
	useEffect(() => {
		if (ref) {
			ref.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest',
			});
			const { scrollHeight, clientHeight, scrollTop } = ref;

			// 자신의 채팅일 경우
			if (messages[messages.length - 1].userId == currentUser.id)
				ref.scrollTop = scrollHeight - clientHeight;
			// 팝업 버튼이 나오지 않을 만큼 애매한 경우
			else if (scrollTop >= scrollHeight - clientHeight - 200) {
				ref.scrollTop = scrollHeight - clientHeight;
			}
			// 상대방의 채팅일 경우
			else {
				setNewMessage(messages[messages.length - 1].message);
				setNewMsgDisplay('flex');
			}
		}
	}, [messages]);

	// 새로운 메세지 수신 시 ToBottom 버튼 안보이기
	useEffect(() => {
		if (newMsgDisplay === 'flex') setToBottomDisplay('none');
	}, [newMsgDisplay]);

	const receiveMessage = (message: any) => {
		setMessages([...messages, message]);
	};

	const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			if (!e.shiftKey) {
				e.preventDefault();
				console.log(chatInput.value);
				onInputSubmit();
				return;
			}
		}
	};
	const onInputSubmit = async () => {
		if (chatInput.value === '') return;

		// 소켓 데이터 생성
		const submitData = {
			userId: currentUser.id,
			message: chatInput.value,
			createTime: new Date(),
		};

		// 데이터 베이스 전달
		await axios.post(`/api/message/write`, {
			messageRoomId: roomId,
			userId: submitData.userId,
			text: submitData.message,
		});
		socket!.emit('message', submitData);
		chatInput.setValue('');
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (chatInput.value === '') return;

		// 소켓 데이터 생성
		const submitData = {
			userId: currentUser.id,
			message: chatInput.value,
			createTime: new Date(),
		};

		// 데이터 베이스 전달
		await axios.post(`/api/message/write`, {
			messageRoomId: roomId,
			userId: submitData.userId,
			text: submitData.message,
		});
		socket!.emit('message', submitData);

		chatInput.setValue('');
	};

	// 시간 포맷
	const formatTime = (createTime: Date) => {
		const nowDate = new Date();
		const createDate = new Date(createTime);
		let isToday = nowDate.toDateString() === createDate.toDateString(); // 채팅 날짜가 오늘 날짜인지 체크

		// 오늘 = 시각
		if (isToday) return createDate.toLocaleTimeString().slice(0, -3);
		// 오늘이 아닌 날 = 날짜 + 시각
		else return createDate.toLocaleString().slice(0, -3);
	};

	// 날짜 포맷
	const formatDate = (createTime: Date) => {
		const date = new Date(createTime);
		let day = '';
		switch (date.getDay()) {
			case 0:
				day = '일';
				break;
			case 1:
				day = '월';
				break;
			case 2:
				day = '화';
				break;
			case 3:
				day = '수';
				break;
			case 4:
				day = '목';
				break;
			case 5:
				day = '금';
				break;
			case 6:
				day = '토';
				break;
		}
		return (
			date.getFullYear() +
			'년 ' +
			(date.getMonth() + 1) +
			'월 ' +
			date.getDate() +
			'일 ' +
			day +
			'요일'
		);
	};

	// 같은 시각은 미출력, 채팅 최하단에 출력
	const compareTime = (current: Date, next: Date) => {
		if (
			next.toDateString() === current.toDateString() &&
			next.getHours() === current.getHours() &&
			next.getMinutes() === current.getMinutes()
		) {
			return '';
		}
		return formatTime(current);
	};

	// 같은 시각은 미출력, 채팅 최상단에 출력
	const compareDate = (current: Date, prev: Date) => {
		if (prev.toDateString() === current.toDateString()) {
			return null;
		}
		return formatDate(current);
	};

	// 채팅방 스크롤 이벤트
	const onScrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
		const { scrollHeight, clientHeight, scrollTop } = event.currentTarget;
		// 스크롤이 마지막인 경우
		if (scrollTop >= scrollHeight - clientHeight - 200) {
			setNewMsgDisplay('none');
			setToBottomDisplay('none');
		} else if (newMsgDisplay === 'none') setToBottomDisplay('block');
	};

	// 장소 버튼
	const handlePlaceOpen = () => {
		setPlaceOpen(true);
	};
	const handlePlaceClose = () => {
		setPlaceOpen(false);
	};

	// 햄버거 버튼
	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = async (event: React.MouseEvent<HTMLLIElement>) => {
		setAnchorEl(null);
		event.preventDefault();
		switch (event.currentTarget.value) {
			case 0: // 팔로우
				const res = await axios.post(`/api/user/follow`, {
					userId: opponent.id,
					followerId: currentUser.id,
				});
				alert(res.data.message);
				return;
			case 1: // 신고
				return;
			case 2: //채팅 나가기
				var result = confirm('채팅방을 나가시겠습니까?');
				if (result) {
					const exitRoom = await axios.post(
						`/api/message/room/exit`,
						currentUser.isHost === 1
							? {
									hostUserId: currentUser.id,
									userId: opponent.id,
							  }
							: { hostUserId: opponent.id, userId: currentUser.id },
					);
					if (exitRoom.data.success) Router.push('/');
					else alert('오류가 발생했습니다.');
				}
				return;
			case 3: // 호스팅 완료
				var result = confirm('호스팅을 완료하겠습니까?');
				if (result) {
					const completeHosting = await axios.post(
						`/api/host/application/complete`,
						{
							id: applicationId,
						},
					);
					if (completeHosting.data.success) alert('호스팅이 완료되었습니다!');
					else alert('오류가 발생했습니다.');
				}
				return;
		}
	};

	// 아래로
	const toBottom = () => {
		if (ref) {
			const { scrollHeight, clientHeight } = ref;
			ref.scrollTop = scrollHeight - clientHeight;
		}
	};

	// 새로운 메세지
	const handleNewMessageClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setNewMsgDisplay('none');
		toBottom();
	};

	// 아래로 버튼
	const handleToBottomClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setToBottomDisplay('none');
		toBottom();
	};

	// textarea 리사이즈
	const handleResizeHeight = useCallback(() => {
		const ref = textAreaRef.current;
		if (textAreaRef === null || ref === null) return;
		ref.style.height = '1em';
		ref.style.height = ref.scrollHeight + 'px';
		setScrollDisplay('default');
	}, []);

	useEffect(() => {
		if (chatInput.value === '') {
			const ref = textAreaRef.current;
			if (textAreaRef === null || ref === null) return;
			ref.style.height = '1em';
			setScrollDisplay('none');
		}
	}, [chatInput.value]);

	return (
		<ChatRoomContainer scrollDisplay={scrollDisplay}>
			<header>
				<div>
					<h4>{opponent.nickname}님과의 채팅</h4>
					<IconButton
						className='location'
						onClick={handlePlaceOpen}
						onChange={handlePlaceOpen}
					>
						<PersonPinCircleIcon />
					</IconButton>
					<IconButton className='menu' onClick={handleMenuClick}>
						<MenuIcon />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						keepMounted
						open={open}
						onClose={handleClose}
					>
						{options.map((option, index) => (
							<MenuItem key={index} value={index} onClick={handleClose}>
								{option}
							</MenuItem>
						))}
					</Menu>
				</div>
			</header>
			<PlaceInput
				type='address'
				width='100%'
				border='1px solid #ccc'
				textAlign={place ? 'center' : 'right'}
				onClick={(e: React.MouseEvent<HTMLInputElement>) => {
					e.preventDefault();
					console.log(placeInputOpen);
					setPlaceInputOpen(!placeInputOpen);
					console.log(placeInputOpen);
				}}
				value={
					place?.formatted_address || '만나고 싶은 장소를 정하려면 클릭! ☝'
				}
				isVisible={placeInputOpen}
				style={{ paddingRight: `${place}` == 'undefined' ? '4.25em' : '1em' }}
				disabled
			/>
			<StyledModal open={placeOpen} onClose={handlePlaceClose}>
				<Fade in={placeOpen}>
					<div className='searchForm'>
						<SearchPlace setPlace={setPlace} />
					</div>
				</Fade>
			</StyledModal>
			<div ref={scrollRef} className='messageBox' onScroll={onScrollHandler}>
				{messages.map((message, i) => {
					const prevTime = new Date(messages[i - 1]?.createTime || null);
					const currentTime = new Date(message.createTime);
					const nextTime = new Date(messages[i + 1]?.createTime || null);
					const date = compareDate(currentTime, prevTime);
					return message.userId === currentUser.id ? (
						<div>
							{date != null ? <p>{date}</p> : ''}
							<MyChat key={i} createTime={compareTime(currentTime, nextTime)}>
								{message.message}
							</MyChat>
						</div>
					) : (
						<div>
							{date != null ? <p>{date}</p> : ''}
							<OppositeChat
								key={i}
								createTime={compareTime(currentTime, nextTime)}
							>
								{message.message}
							</OppositeChat>
						</div>
					);
				})}
				<div className='popup'>
					<div
						className='newMessage'
						onClick={handleNewMessageClick}
						style={{ display: `${newMsgDisplay}` }}
					>
						<p>{newMessage}</p>
						<VerticalAlignBottomIcon />
					</div>
					<div
						className='toBottom'
						onClick={handleToBottomClick}
						style={{ display: `${toBottomDisplay}` }}
					>
						<VerticalAlignBottomIcon />
					</div>
				</div>
			</div>
			<form onSubmit={onSubmit}>
				<textarea
					ref={textAreaRef}
					onKeyPress={onKeyPress}
					onInput={handleResizeHeight}
					{...chatInput}
				/>
				<Button type='submit'>전송</Button>
			</form>
		</ChatRoomContainer>
	);
};

export default ChatRoom;
