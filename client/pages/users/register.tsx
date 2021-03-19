import React from 'react';
import Layout from '../../components/main/Layout';
import Register from '../../components/user/Register';

interface Props {}

const register = (props: Props) => {
	return (
		<Layout title="회원가입 | localhost">
			<Register />
		</Layout>
	);
};

export default register;
