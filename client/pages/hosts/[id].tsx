import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import HostDetail from '../../components/host/HostDetail';
import Layout from '../../components/main/Layout';
import { Host } from '../../interfaces';
import SERVER from '../../utils/url';

interface Props {
	pageProps: {
		host: Host;
		reviews: any;
	};
}

const HostDetailPage = ({ pageProps }: Props) => {
	return (
		<Layout title='호스트 정보 | localhost'>
			<HostDetail host={pageProps.host} />
		</Layout>
	);
};

export default HostDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
	// Get the paths we want to pre-render based on users
	const paths = await (
		await axios.get(`${SERVER}/api/host/list`)
	).data.list.map(host => ({
		params: { id: host.id.toString() },
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
