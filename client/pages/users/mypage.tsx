import React from 'react';
import Layout from '../../components/main/Layout';
import Mypage from '../../components/user/Mypage';
import { sampleUserData } from '../../utils/sample-data';
import { LoginProps, User } from '../../interfaces/index';
import { GetServerSideProps, GetStaticProps } from 'next';

interface Props {}

const mypage = (props: Props) => {
	return (
		<Layout title='마이페이지 | localhost'>
			<Mypage />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return { props: {} };
};

export default mypage;
