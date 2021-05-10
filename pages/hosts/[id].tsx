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
		const host = res.data.host;
		const reviews = res.data.reviews;

		return { props: { host, reviews } };
	} catch (err) {
		return { props: { errors: err.message } };
	}
};
