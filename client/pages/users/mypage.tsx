import React from 'react';
import Layout from '../../components/main/Layout';
import Mypage from '../../components/user/Mypage';
import { sampleUserData } from '../../utils/sample-data';
import { LoginProps, User } from '../../interfaces/index';
import { GetServerSideProps, GetStaticProps } from 'next';

interface Props {
	loginProps: LoginProps;
	pageProps: {
		firstTab: number;
	};
}

const mypage = ({ loginProps, pageProps }: Props) => {
	return (
		<Layout title='마이페이지 | localhost' loginProps={loginProps}>
			<Mypage user={loginProps.user} firstTap={pageProps.firstTab} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return { props: { firstTab: Number(ctx.query.tab) } };
};

export default mypage;
