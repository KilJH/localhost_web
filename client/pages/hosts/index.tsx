import { GetStaticProps } from 'next';
import React from 'react';
import HostList from '../../components/host/HostList';
import Layout from '../../components/main/Layout';

interface Props {}

const index = (props: Props) => {
	return (
		<Layout>
			<HostList />
		</Layout>
	);
};

export default index;

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};
