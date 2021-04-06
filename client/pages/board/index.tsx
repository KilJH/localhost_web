import axios from 'axios';
import { GetStaticProps } from 'next';
import React from 'react';
import BoardList from '../../components/board/BoardList';
import Layout from '../../components/main/Layout';
import { Board } from '../../interfaces';
import SERVER from '../../utils/url';

interface Props {
	pageProps: {
		boards: Board[];
	};
}

const index = ({ pageProps }: Props) => {
	return (
		<Layout title='자유게시판 | localhost'>
			<BoardList boards={pageProps.boards} />
		</Layout>
	);
};

export default index;

export const getStaticProps: GetStaticProps = async (ctx) => {
	const res = await axios.get(`${SERVER}/api/board/list`);

	return { props: { boards: res.data.list } };
};
