import { GetServerSideProps } from 'next';
import { BlackUser } from '../../../interfaces';
import React from 'react';
import axios from 'axios';
import SERVER from '../../../client/utils/url';
import AdminLayout from '../../../components/admin/AdminLayout';

// type Props = {
// 	pageProps: {
// 		items: BlackUser[];
// 	};
// };

const list = () => {
	return (
		<AdminLayout title='차단회원목록' selected='blacklist'>
			{/* <BlackUserPage items={items} /> */}
		</AdminLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const items: BlackUser[] = await (await axios.get(`${SERVER}/api/user/list`))
		.data.users;

	return { props: { items } };
};

export default list;
