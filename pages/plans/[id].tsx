import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import SERVER from '../../client/utils/url';
import Layout from '../../components/main/Layout';
import PlanOverview from '../../components/plan/PlanOverview';
import PlanWholeItem from '../../components/plan/PlanWholeItem';
import { Plan } from '../../interfaces';

interface Props {
	pageProps: {
		plan: Plan;
	};
}

const PlanDetailPage = ({ pageProps }: Props) => {
	return (
		<Layout title={`플랜보기 | localhost`}>
			<PlanOverview {...pageProps} />
			<PlanWholeItem plans={pageProps.plan.planDays!} />
		</Layout>
	);
};

export default PlanDetailPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
	const id = ctx.params?.id;
	const res = await axios.post(`${SERVER}/api/plan/load`, { id });

	return { props: { ...res.data } };
};
