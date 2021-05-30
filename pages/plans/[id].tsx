import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import SERVER from '../../client/utils/url';
import withAuth from '../../components/main/hoc/withAuth';
import Layout from '../../components/main/Layout';
import PlanCommentList from '../../components/plan/PlanCommentList';
import PlanOverview from '../../components/plan/PlanOverview';
import PlanWholeItem from '../../components/plan/PlanWholeItem';
import { Plan, Comment } from '../../interfaces';

interface Props {
	pageProps: {
		plan: Plan;
		comments: Comment[];
		likes: number;
		isLiked: boolean;
	};
}

const PlanDetailPage = ({ pageProps }: Props) => {
	return (
		<Layout title={`플랜보기 | localhost`}>
			<PlanOverview {...pageProps} />
			<PlanWholeItem plans={pageProps.plan.planDays!} />
			<PlanCommentList
				comments={pageProps.comments}
				planId={pageProps.plan.id!}
			/>
		</Layout>
	);
};

export default withAuth(1, 0)(PlanDetailPage);

export const getServerSideProps: GetServerSideProps = async ctx => {
	const planId = ctx.params?.id;

	const cookie = ctx.req.headers.cookie || '';
	const userRes = await axios.get(`${SERVER}/api/auth/check`, {
		withCredentials: true,
		headers: {
			cookie,
		},
	});
	const userId = userRes.data.user.id;

	const planRes = await axios.post(`${SERVER}/api/plan/load`, { id: planId });

	const likesRes = await axios.get(
		`${SERVER}/api/plan/like/quantity?planId=${planId}`,
	);

	const isLikedRes = await axios.post(`${SERVER}/api/plan/like/check`, {
		planId,
		userId,
	});

	return {
		props: { ...planRes.data, likes: likesRes.data.likes, ...isLikedRes.data },
	};
};
