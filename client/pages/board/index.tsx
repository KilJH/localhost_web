import { GetStaticProps } from 'next';
import React from 'react';
import BoardList from '../../components/board/BoardList';
import Layout from '../../components/main/Layout';

interface Props {}

const index = (props: Props) => {
	return (
		<Layout title='자유게시판 | localhost'>
			<BoardList />
		</Layout>
	);
};

export default index;

export const getStaticProps: GetStaticProps = async (ctx) => {
	return { props: {} };
};
