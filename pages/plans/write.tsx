import React from 'react';
import Layout from '../../components/main/Layout';
import PlanWrite from '../../components/plan/PlanWrite';

const write = () => {
	return (
		<Layout title='플랜 작성 | localhost'>
			<PlanWrite />
		</Layout>
	);
};

export default write;
