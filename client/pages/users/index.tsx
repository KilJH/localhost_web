import { GetStaticProps } from 'next';
import Link from 'next/link';

import { LoginProps, User } from '../../interfaces';
import Layout from '../../components/main/Layout';
import List from '../../components/user/List';
import axios from 'axios';
import SERVER from '../../utils/url';

type Props = {
	loginProps: LoginProps;
	pageProps: {
		items: User[];
	};
};

const WithStaticProps = ({ pageProps, loginProps }: Props) => (
	<Layout title='Users List | localhost' loginProps={loginProps}>
		<h1>Users List</h1>
		<p>
			Example fetching data from inside <code>getStaticProps()</code>.
		</p>
		<p>You are currently on: /users</p>
		<List items={pageProps.items} />
		<p>
			<Link href='/'>
				<a>Go home</a>
			</Link>
		</p>
	</Layout>
);

export const getStaticProps: GetStaticProps = async () => {
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.
	const items: User[] = await (await axios.get(`${SERVER}/api/user/list`)).data
		.users;
	return { props: { items } };
};

export default WithStaticProps;
