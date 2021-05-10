import { GetServerSideProps } from 'next';
import React from 'react';
import ChatRoom from '../components/host/Chat/ChatRoom';
import Layout from '../components/main/Layout';

const Test = () => {
	return (
		<Layout>
			<ChatRoom />
		</Layout>
	);
};

export default Test;

export const getServerSideProps: GetServerSideProps = async () => {
	return { props: {} };
};
