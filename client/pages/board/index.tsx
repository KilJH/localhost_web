import axios from 'axios';
import { GetServerSideProps, GetStaticProps } from 'next';
import React from 'react';
import BoardList from '../../components/board/BoardList';
import Layout from '../../components/main/Layout';
import { Board } from '../../interfaces';
import SERVER from '../../utils/url';

interface Props {
	pageProps: {
		boards: Board[];
		page: number;
		lastIdx: number;
	};
}

const index = ({ pageProps }: Props) => {
	return (
		<Layout title='자유게시판 | localhost'>
			<BoardList
				boards={pageProps.boards}
				page={pageProps.page}
				lastIdx={pageProps.lastIdx}
			/>
		</Layout>
	);
};

export default index;

export const getServerSideProps: GetServerSideProps = async ctx => {
	const page = ctx.query.page || 1;
	const res = await axios.get(`${SERVER}/api/board/list?page=${page}`);

	// page=?
	return {
		props: {
			boards: res.data.list,
			page: res.data.page,
			lastIdx: res.data.lastIdx,
		},
	};
};
