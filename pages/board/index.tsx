import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import SERVER from '../../client/utils/url';
import BoardList from '../../components/board/BoardList';
import Layout from '../../components/main/Layout';
import { Board } from '../../interfaces';

interface Props {
	pageProps: {
		pagedBoards: Board[];
		lastIdx: number;
		page: number;
	};
}

const index = ({ pageProps }: Props) => {
	return (
		<Layout title='자유게시판 | localhost'>
			<BoardList {...pageProps} />
		</Layout>
	);
};

export default index;

export const getServerSideProps: GetServerSideProps = async ctx => {
	const res = await axios.get(
		`${SERVER}/api/board/list?page=${ctx.query.page || 1}`,
	);
	return {
		props: { ...res.data },
	};
};
