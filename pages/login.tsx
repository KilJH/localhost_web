import React from 'react';
import Layout from '../components/main/Layout';
import Login from '../components/user/Login';
import styled from 'styled-components';
import withAuth from '../components/main/hoc/withAuth';
import { GetServerSideProps } from 'next';

const LoginContainer = styled.div`
	& > * {
		margin: 0 auto;
	}
`;

const login = () => {
	return (
		<Layout title='로그인 | localhost'>
			<LoginContainer>
				<Login />
			</LoginContainer>
		</Layout>
	);
};

export default withAuth(2, 0)(login);

export const getServerSideProps: GetServerSideProps = async () => {
	return { props: {} };
};
