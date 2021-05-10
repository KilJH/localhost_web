import React from 'react';
import withAuth from '../../components/main/hoc/withAuth';
import Layout from '../../components/main/Layout';
import Register from '../../components/user/Register';

const register = () => {
	return (
		<Layout title='회원가입 | localhost'>
			<Register />
		</Layout>
	);
};

export default withAuth(2, 0)(register);
