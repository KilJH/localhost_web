import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import HostDetail from '../../components/host/HostDetail';
import Layout from '../../components/main/Layout';
import { Host, Review } from '../../interfaces';
import SERVER from '../../client/utils/url';

interface Props {
	pageProps: {
		host: Host;
		reviews: Review[];
		additionalData: {
			hostingCount: number;
			probability: number;
		};
	};
}

const HostDetailPage = ({ pageProps }: Props) => {
	return (
		<Layout title='호스트 정보 | localhost'>
			<HostDetail {...pageProps} />
		</Layout>
	);
};

export default HostDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	try {
		const id = params?.id;
		const res = await axios.post(`${SERVER}/api/host/load`, { id });
		const { host, reviews, data: additionalData } = res.data;

		return { props: { host, reviews, additionalData } };
	} catch (err) {
		return { props: { errors: err.message } };
	}
};
