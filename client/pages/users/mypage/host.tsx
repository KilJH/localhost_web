import React from 'react';
import Layout from '../../../components/main/Layout';
import Mypage from '../../../components/user/Mypage/Mypage';
import {
	Application,
	PreviousApplication,
	User,
} from '../../../interfaces/index';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import SERVER from '../../../utils/url';
import MyHostLog from '../../../components/user/Mypage/MyHostLog';

interface Props {
	pageProps: {
		// 호스트에 관한 기록들
		// 현재 요청한 호스트
		applications?: Application[];
		preApplications?: PreviousApplication[];
	};
}

const mypage = ({ pageProps }: Props) => {
	return (
		<Layout title='마이페이지 | localhost'>
			<MyHostLog />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	// 로그인 유저 id 가져오기
	const res = await axios.post(
		`${SERVER}/api/auth/check`,
		{ token: ctx.req.cookies.token },
		{ withCredentials: true },
	);

	const userId = res.data.user.id;

	const resApp = await axios.post(`${SERVER}/api/host/applyList`, {
		userId,
	});
	const resPreApp = await axios.post(`${SERVER}/api/host/doneHosting`, {
		userId,
	});

	const applications = resApp.data.applicant;
	const preApplications = resPreApp.data.previousApplicant;

	console.log(applications, preApplications);

	return { props: { applications, preApplications } };
};

export default mypage;
