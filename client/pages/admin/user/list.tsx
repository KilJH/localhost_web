import { GetStaticProps } from 'next';
import { User } from '../../../interfaces';
import React from 'react';
import axios from 'axios';
import SERVER from '../../../utils/url';
import UserPage from '../../../components/admin/user/UserPage';
import AdminLayout from '../../../components/admin/AdminLayout';

type Props = {
	pageProps: {
		items: User[];
	};
};

const list = ({ pageProps }: Props) => {
	return (
		<AdminLayout title='회원목록' selected='user'>
			<UserPage {...pageProps} />
		</AdminLayout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.
	const items: User[] = await (await axios.get(`${SERVER}/api/user/list`)).data
		.users;
	return { props: { items } };
};

export default list;
