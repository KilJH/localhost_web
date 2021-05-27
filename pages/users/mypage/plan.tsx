import React from 'react';
import Layout from '../../../components/main/Layout';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import SERVER from '../../../client/utils/url';
import withAuth from '../../../components/main/hoc/withAuth';
import MyPlan from '../../../components/user/Mypage/MyPlan';
import { Plan } from '../../../interfaces';

interface Props {
	pageProps: {
		// 내가 담은 플랜들
		wishPlans: Plan[];
		// 내가 작성한 플랜들
		myPlans: Plan[];
	};
}

const mypage = ({ pageProps }: Props) => {
	return (
		<Layout title='마이페이지 | localhost'>
			<MyPlan {...pageProps} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	// 로그인 유저 id 가져오기
	const cookie = ctx.req.headers.cookie || '';

	const res = await axios.get(`${SERVER}/api/auth/check`, {
		withCredentials: true,
		headers: {
			cookie,
		},
	});

	const userId = res.data.user.id;

	const wishRes = await axios.post(`${SERVER}/api/plan/wishlist`, { userId });

	const myPlanRes = await axios.post(`${SERVER}/api/plan/list/myPlan`, {
		userId,
	});

	return {
		props: { wishPlans: wishRes.data.list, myPlans: myPlanRes.data.plans },
	};
};

export default withAuth(1, 0)(mypage);
