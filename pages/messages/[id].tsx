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
	};
};

const StaticPropsDetail = ({ pageProps }: Props) => {
	return (
		<Layout title={`채팅 | localhost`}>
			<ChatRoom {...pageProps} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const opponentId = context.params?.id;

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
	return { props: { loadMessages: messages, roomId: roomId } };
};
export default StaticPropsDetail;
