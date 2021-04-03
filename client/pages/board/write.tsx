import { GetStaticProps } from 'next';
import React from 'react';
import BoardWrite from '../../components/board/BoardWrite';
import Layout from '../../components/main/Layout';

interface Props {}

const write = (props: Props) => {
	return (
		<Layout>
			<BoardWrite />
		</Layout>
	);
};

export default write;

export const getStaticProps: GetStaticProps = async (ctx) => {
	return { props: {} };
};
