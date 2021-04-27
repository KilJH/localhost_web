import React from 'react';
import Layout from '../../../components/main/Layout';
import Mypage from '../../../components/user/Mypage/Mypage';
import { User } from '../../../interfaces/index';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import SERVER from '../../../utils/url';

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
	const res = await axios.post(
		`${SERVER}/api/auth/check`,
		{ token: ctx.req.cookies.token },
		{ withCredentials: true },
	);

	const userId = res.data.user.id;

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

export default mypage;
