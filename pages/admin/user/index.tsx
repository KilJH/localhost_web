import { GetServerSideProps } from 'next';
import { User } from '../../../interfaces';
import React from 'react';
import axios from 'axios';
import SERVER from '../../../client/utils/url';
import UserPage from '../../../components/admin/user/UserPage';
import AdminLayout from '../../../components/admin/AdminLayout';

type Props = {
	pageProps: {
		items: User[];
	};
};

const list = ({ pageProps }: Props) => {
	const { items } = pageProps;
	return (
		<AdminLayout title='회원목록' selected='user'>
			<UserPage items={items} />
		</AdminLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const items: User[] = await (await axios.get(`${SERVER}/api/user/list`)).data
		.users;

	return { props: { items } };
};

export default list;
