import React from 'react';
import Layout from '../../../components/main/Layout';
import Mypage from '../../../components/user/Mypage/Mypage';
import { User } from '../../../interfaces/index';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import SERVER from '../../../client/utils/url';
import withAuth from '../../../components/main/hoc/withAuth';

interface Props {
	pageProps: {
		followingUsers?: User[];
		followers?: User[];
	};
}

const mypage = ({ pageProps }: Props) => {
	return (
		<Layout title='마이페이지 | localhost'>
			<Mypage
				followers={pageProps.followers}
				followingUsers={pageProps.followingUsers}
			/>
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

	const userId = res.data.user?.id;

	const resFollowing = await axios.post(`${SERVER}/api/user/followingList`, {
		userId,
	});
	const resFollower = await axios.post(`${SERVER}/api/user/followerList`, {
		userId,
	});

	const followingUsers = resFollowing.data.followingUsers;
	const followers = resFollower.data.followers;

	return { props: { followingUsers, followers } };
};

export default withAuth(1, 0)(mypage);
