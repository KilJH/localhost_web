import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../../components/main/Layout';
import Register from '../../components/user/Register';
import { LoginProps } from '../../interfaces';

interface Props {
	loginProps: LoginProps;
}

const register = (props: Props) => {
	return (
		<Layout title='회원가입 | localhost' loginProps={props.loginProps}>
			<Register />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.
	return { props: {} };
};

export default register;
