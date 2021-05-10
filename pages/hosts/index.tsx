import React from 'react';
import Layout from '../../components/main/Layout';
import HostMain from '../../components/host/HostMain';
import withAuth from '../../components/main/hoc/withAuth';

const IndexHost = () => {
	return (
		<Layout title='호스트 검색 | localhost'>
			<HostMain />
		</Layout>
	);
};

export default withAuth(1, 0)(IndexHost);
