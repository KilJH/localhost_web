import React from 'react';
import Layout from '../../../components/main/Layout';
import { Application, PreviousApplication } from '../../../interfaces/index';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import SERVER from '../../../client/utils/url';
import MyHostLog from '../../../components/user/Mypage/MyHostLog';
import withAuth from '../../../components/main/hoc/withAuth';

interface Props {
	pageProps: {
		// 호스트에 관한 기록들
		// 현재 요청한 호스트
		applications: Application[];
		preApplications: PreviousApplication[];
	};
}

const mypage = ({ pageProps }: Props) => {
	return (
		<Layout title='마이페이지 | localhost'>
			<MyHostLog {...pageProps} />
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

	const resApp = await axios.post(`${SERVER}/api/host/application/list`, {
		userId,
	});
	const resPreApp = await axios.post(`${SERVER}/api/host/application/history`, {
		userId,
	});

	const applications = resApp.data.applicant || [];
	const preApplications = resPreApp.data.previousApplicant || [];

	return { props: { applications, preApplications } };
};

export default withAuth(1, 0)(mypage);
