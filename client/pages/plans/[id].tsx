import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import Layout from '../../components/main/Layout';
import PlanDetail from '../../components/plan/PlanDetail';
import PlanOverview from '../../components/plan/PlanOverview';
import { LoginProps, Plan } from '../../interfaces';
import { samplePlanData } from '../../utils/sample-data';

interface Props {
	pageProps: {
		plan?: Plan;
		errors?: string;
	};
}

const PlanDatailPage = ({ pageProps }: Props) => {
	// // 쓰잘데기 없을 거 같은데
	// if (pageProps.errors) {
	// 	return (
	// 		<Layout title='Error | localhost' loginProps={loginProps}>
	// 			<p>
	// 				<span style={{ color: 'red' }}>Error:</span> {pageProps.errors}
	// 			</p>
	// 		</Layout>
	// 	);
	// }

	return (
		<Layout
			title={`${
				pageProps.plan ? pageProps.plan.title : 'Plan Detail'
			} | localhost`}
		>
			{pageProps.plan && <PlanOverview plan={pageProps.plan} />}
			{pageProps.plan && <PlanDetail />}
		</Layout>
	);
};

export default PlanDatailPage;

export const getStaticPaths: GetStaticPaths = async () => {
	// Get the paths we want to pre-render based on users
	const paths = samplePlanData.map((plan) => ({
		params: { id: plan.id.toString() },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const id = params?.id;
		const plan = samplePlanData.find((data) => data.id === Number(id));
		return { props: { plan } };
	} catch (err) {
		return { props: { errors: err.message } };
	}
};
