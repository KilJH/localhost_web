import { GetServerSideProps } from 'next';
import { Host, User } from '../../../interfaces';
import React from 'react';
import SERVER from '../../../client/utils/url';
import axios from 'axios';
import HostPage from '../../../components/admin/host/HostPage';
import AdminLayout from '../../../components/admin/AdminLayout';
import withAuth from '../../../components/main/hoc/withAuth';

type Props = {
	pageProps: {
		items: Host[];
	};
};

const list = ({ pageProps }: Props) => (
	<AdminLayout title='호스트목록' selected='host'>
		<HostPage {...pageProps} />
	</AdminLayout>
);

export const getServerSideProps: GetServerSideProps = async () => {
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.

	const items: User[] = await (
		await axios.get(`${SERVER}/api/host/list`)
	).data.list;
	return { props: { items } };
};

export default withAuth(1, 2)(list);
