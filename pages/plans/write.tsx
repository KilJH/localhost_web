import React from 'react';
import withAuth from '../../components/main/hoc/withAuth';
import Layout from '../../components/main/Layout';
import PlanWrite from '../../components/plan/PlanWrite';

const write = () => {
	return (
		<Layout title='플랜 작성 | localhost'>
			<PlanWrite />
		</Layout>
	);
};

export default withAuth(1, 0)(write);
