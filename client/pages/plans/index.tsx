import React from 'react';
import Layout from '../../components/main/Layout';
import PlanList from '../../components/plan/PlanList';
import { samplePlanData } from '../../utils/sample-data';
import { GetStaticProps } from 'next';
import { LoginProps, Plan } from '../../interfaces';

interface Props {
	loginProps: LoginProps;
	pageProps: {
		plans: Plan[];
	};
}

const index = (props: Props) => {
	const { loginProps, pageProps } = props;

	return (
		<Layout title='플랜보기 | localhost' loginProps={loginProps}>
			<PlanList plans={pageProps.plans} />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const plans: Plan[] = samplePlanData;
	return { props: { plans } };
};

export default index;
