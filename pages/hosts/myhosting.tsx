import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import MyHostingPage from '../../components/host/MyHosting/MyHostingPage';
import Layout from '../../components/main/Layout';
import { Application, Host, PreviousApplication } from '../../interfaces';
import SERVER from '../../client/utils/url';

interface Props {
	pageProps: {
		host: Host;
		waitingApplicant: Application[];
		previousApplicant: PreviousApplication[];
		matchedApplicant: Application[];
	};
}

const myhosting = ({ pageProps }: Props) => {
	return (
		<div>
			<Layout title='나의 호스팅 | localhost'>
				<MyHostingPage {...pageProps} />
			</Layout>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	// 로그인 유저 id 가져오기
	let waitingApplicant: any[] = [];
	let matchedApplicant: any[] = [];

	const cookie = ctx.req.headers.cookie || '';

	const res = await axios.get(`${SERVER}/api/auth/check`, {
		withCredentials: true,
		headers: {
			cookie,
		},
	});

	const userId = res.data.user.id;

	const resLoadHost = await axios.post(`${SERVER}/api/host/load`, {
		id: userId,
	});
	const host = resLoadHost.data.host;

	const applyList = await (
		await axios.post(`${SERVER}/api/host/application/list`, {
			hostUserId: userId,
		})
	).data.applicant;

	applyList.map(value => {
		if (value.status === 0) waitingApplicant.push(value);
	});

	const previousApplicant = await (
		await axios.post(`${SERVER}/api/host/application/history`, {
			hostUserId: host.id,
		})
	).data.previousApplicant;

	const applicationList = await (
		await axios.post(`${SERVER}/api/host/application/list`, {
			hostUserId: host.id,
		})
	).data.applicant;

	applicationList.map(value => {
		if (value.status === 1) matchedApplicant.push(value);
	});
	return {
		props: {
			host,
			waitingApplicant,
			previousApplicant,
			matchedApplicant,
		},
	};
};
export default myhosting;
