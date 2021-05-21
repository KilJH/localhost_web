import React from 'react';
import BoardWrite from '../../components/board/BoardWrite';
import withAuth from '../../components/main/hoc/withAuth';
import Layout from '../../components/main/Layout';

const write = () => {
	return (
		<Layout>
			<BoardWrite />
		</Layout>
	);
};

export default withAuth(1, 0)(write);
