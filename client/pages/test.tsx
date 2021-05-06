import { GetStaticProps } from 'next';
import React from 'react';
import ChatRoom from '../components/host/Chat/ChatRoom';
import Layout from '../components/main/Layout';

interface Props {}

const Test = (props: Props) => {
	return (
		<Layout>
			<ChatRoom />
		</Layout>
	);
};

export default Test;

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};
