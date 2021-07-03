import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { User } from '../../interfaces';
import Layout from '../../components/main/Layout';
import List from '../../components/user/List';
import axios from 'axios';
import SERVER from '../../client/utils/url';
import withAuth from '../../components/main/hoc/withAuth';

type Props = {
	pageProps: {
		items: User[];
	};
};

const UserList = ({ pageProps }: Props) => (
	<Layout title='Users List | localhost'>
		<h1>Users List</h1>
		<List items={pageProps.items} />
		<p>
			<Link href='/'>
				<a>Go home</a>
			</Link>
		</p>
	</Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.
	const items: User[] = await (
		await axios.get(`${SERVER}/api/user/list`)
	).data.users;
	return { props: { items } };
};

export default withAuth(1, 2)(UserList);
