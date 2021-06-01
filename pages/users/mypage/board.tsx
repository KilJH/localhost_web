import React from 'react';
import Layout from '../../../components/main/Layout';
import { Board } from '../../../interfaces/index';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import SERVER from '../../../client/utils/url';
import withAuth from '../../../components/main/hoc/withAuth';
import MyBoard from '../../../components/user/Mypage/MyBoard';

interface Props {
	pageProps: {
		boards: Board[];
	};
}

const board = ({ pageProps }: Props) => {
	return (
		<Layout title='나의 게시물 | localhost'>
			<MyBoard {...pageProps} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	// 로그인 유저 id 가져오기
	const cookie = ctx.req.headers.cookie || '';

	const res = await axios.get(`${SERVER}/api/auth/check`, {
		withCredentials: true,
		headers: {
			cookie,
		},
	});

	const userId = res.data.user.id;

	const resBoards = await axios.post(`${SERVER}/api/board/list/myBoard`, {
		userId,
	});

	const boards = resBoards.data.boards || [];

	return { props: { boards } };
};

export default withAuth(1, 0)(board);
