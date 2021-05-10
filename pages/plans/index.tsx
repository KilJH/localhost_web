import React from 'react';
import Layout from '../../components/main/Layout';
import PlanList from '../../components/plan/PlanList';
import { Plan } from '../../interfaces';

interface Props {
	pageProps: {
		plans?: Plan[];
	};
}

const index = (props: Props) => {
	const { pageProps } = props;

	return (
		<Layout title='플랜보기 | localhost'>
			<PlanList plans={pageProps.plans || []} />
		</Layout>
	);
};

export default index;