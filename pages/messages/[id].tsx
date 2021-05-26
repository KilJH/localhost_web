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
	};
};

const StaticPropsDetail = ({ pageProps }: Props) => {
	return (
		<Layout title={`${pageProps.opponent.nickname}님과의 채팅 | localhost`}>
			<ChatRoom {...pageProps} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const opponentId = context.params?.id;
	const opponent = await (
		await axios.get(`${SERVER}/api/user/${opponentId}`)
	).data.user;
	const cookie = context.req.headers.cookie || '';
	const userId = await (
		await axios.get(`${SERVER}/api/auth/check`, {
			withCredentials: true,
			headers: {
				cookie,
			},
		})
	).data.user.id;

	const res = await (
		await axios.post(`${SERVER}/api/message/room/load`, {
			hostUserId: opponentId,
			userId: userId,
		})
	).data;

	let applicationId = null;
	if (userId.isHost === 1) {
		applicationId = await (
			await axios.post(`${SERVER}/api/host/application/id`, {
				hostUserId: userId,
				userId: opponentId,
			})
		).data.applicationId;
	}

	const messages = res.messages;
	const roomId = res.roomId;
	const hostUserId = res.hostId;
	const userUserId = res.userId;
	return {
		props: {
			loadMessages: messages,
			roomId: roomId,
			hostUserId: hostUserId,
			userUserId: userUserId,
			opponent: opponent,
			applicationId: applicationId,
		},
	};
};
export default withAuth(1, 0)(StaticPropsDetail);
