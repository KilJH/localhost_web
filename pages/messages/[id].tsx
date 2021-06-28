import { GetServerSideProps } from 'next';
import Layout from '../../components/main/Layout';
import axios from 'axios';
import SERVER from '../../client/utils/url';
import React from 'react';
import ChatRoom from '../../components/host/Chat/ChatRoom';
import { User } from '../../interfaces';
import withAuth from '../../components/main/hoc/withAuth';

type Props = {
	pageProps: {
		loadMessages: Array<Object>;
		roomId: number;
		opponent: User;
		hostUserId: number;
		userUserId: number;
		applicationId: number;
		address: string;
		isMine: boolean;
	};
};

const StaticPropsDetail = ({ pageProps }: Props) => {
	if (!pageProps.isMine) {
		location.replace('/');
	}
	return (
		<Layout title={`${pageProps.opponent.nickname}님과의 채팅 | localhost`}>
			<ChatRoom {...pageProps} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const roomId = context.params?.id;
	const cookie = context.req.headers.cookie || '';

	const auth = await axios.get(`${SERVER}/api/auth/check`, {
		withCredentials: true,
		headers: {
			cookie,
		},
	});

	const userId = auth.data.user?.id;

	const room = await (
		await axios.post(`${SERVER}/api/message/room/load`, {
			id: roomId,
		})
	).data;

	const isMine = userId === room.userId || userId === room.hostId;

	const opponentId = userId === room.userId ? room.hostId : room.userId;
	const opponent = await (
		await axios.get(`${SERVER}/api/user/${opponentId}`)
	).data.user;

	return {
		props: {
			loadMessages: room.messages,
			roomId,
			opponent,
			hostUserId: room.hostId,
			userUserId: room.userId,
			applicationId: room.applicationId,
			address: room.address,
			isMine,
		},
	};
};
export default withAuth(1, 0)(StaticPropsDetail);
