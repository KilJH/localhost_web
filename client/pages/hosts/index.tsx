import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../../components/main/Layout';
import HostMain from '../../components/host/HostMain';

interface Props {}

const IndexHost = (props: Props) => {
	return (
		<Layout title='호스트 검색 | localhost'>
			<HostMain />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};

export default IndexHost;
