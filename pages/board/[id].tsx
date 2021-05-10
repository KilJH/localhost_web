import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import SERVER from '../../client/utils/url';
import BoardDetail from '../../components/board/BoardDetail';
import Layout from '../../components/main/Layout';
import { Board, Comment } from '../../interfaces';

interface Props {
	pageProps: {
		board: Board;
		comments: Comment[];
	};
}

const BoardDetailPage = ({ pageProps }: Props) => {
	return (
		<Layout>
			<BoardDetail {...pageProps} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	const res = await axios.post(`${SERVER}/api/board/load`, {
		id: ctx.params!.id,
	});

	return {
		props: { board: res.data.board, comments: res.data.comments || [] },
	};
};

export default BoardDetailPage;
