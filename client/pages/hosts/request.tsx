import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../../components/main/Layout';
import Request from '../../components/host/Request';

interface Props {
	pageProps: {
		// languages: {
		// 	name: string;
		// 	checked: boolean;
		// }[];
	};
}

const apply = ({ pageProps }: Props) => {
	return (
		<Layout title='호스트신청 | localhost'>
			<Request />
		</Layout>
	);
};

export default apply;

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};
