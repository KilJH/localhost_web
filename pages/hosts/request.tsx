import React from 'react';
import Layout from '../../components/main/Layout';
import Request from '../../components/host/Request';
import withAuth from '../../components/main/hoc/withAuth';

const apply = () => {
	return (
		<Layout title='호스트신청 | localhost'>
			<Request />
		</Layout>
	);
};

export default withAuth(1, 0)(apply);
