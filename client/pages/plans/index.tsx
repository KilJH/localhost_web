import React from 'react';
import Layout from '../../components/main/Layout';
import PlanList from '../../components/plan/PlanList';
import { samplePlanData } from '../../utils/sample-data';
import { GetStaticProps } from 'next';
import { LoginProps, Plan } from '../../interfaces';

interface Props {
	pageProps: {
		plans: Plan[];
	};
}

const index = (props: Props) => {
	const { pageProps } = props;

	return (
		<Layout title='플랜보기 | localhost'>
			<PlanList plans={pageProps.plans} />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const plans: Plan[] = samplePlanData;
	return { props: { plans } };
};

export default index;
