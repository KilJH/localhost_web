import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import BoardDetail from '../../components/board/BoardDetail';
import Layout from '../../components/main/Layout';
import SERVER from '../../utils/url';

interface Props {}

const BoardDetailPage = (props: Props) => {
	return (
		<Layout>
			<BoardDetail />
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	// Get the paths we want to pre-render based on users

	const paths = await (
		await axios.get(`${SERVER}/api/board/list`)
	).data.list.map((board) => ({
		params: { id: board.id.toString() },
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return { props: {} };
};

export default BoardDetailPage;
