import { GetServerSideProps } from 'next';
import Layout from '../../components/main/Layout';
import axios from 'axios';
import SERVER from '../../client/utils/url';
import React from 'react';
import ChatRoom from '../../components/host/Chat/ChatRoom';

type Props = {
	pageProps: {
		loadMessages: Array<Object>;
		roomId: number;
		opponent: string;
	};
};

const StaticPropsDetail = ({ pageProps }: Props) => {
	return (
		<Layout title={`${pageProps.opponent}님과의 채팅 | localhost`}>
			<ChatRoom {...pageProps} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const opponentId = context.params?.id;
	const opponent = await (await axios.get(`${SERVER}/api/user/${opponentId}`))
		.data.user.nickname;
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
	const messages = res.messages;
	const roomId = res.roomId;
	return {
		props: { loadMessages: messages, roomId: roomId, opponent: opponent },
	};
};
export default StaticPropsDetail;
