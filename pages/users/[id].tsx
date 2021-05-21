import { GetServerSideProps } from 'next';

import { User } from '../../interfaces';
import Layout from '../../components/main/Layout';
import ListDetail from '../../components/user/ListDetail';
import axios from 'axios';
import SERVER from '../../client/utils/url';
import withAuth from '../../components/main/hoc/withAuth';

type Props = {
	pageProps: {
		item?: User;
		isFollowed: boolean;
		errors?: string;
	};
};

const UserDetail = ({ pageProps }: Props) => {
	return (
		<Layout
			title={`${
				pageProps.item ? pageProps.item.name : 'User Detail'
			} | localhost`}
		>
			{pageProps.item && (
				<ListDetail item={pageProps.item} isFollowed={pageProps.isFollowed} />
			)}
		</Layout>
	);
};

export default withAuth(1, 2)(UserDetail);

export const getServerSideProps: GetServerSideProps = async context => {
	try {
		const id = context.params?.id;
		const item = await (await axios.get(`${SERVER}/api/user/${id}`)).data.user;

		const cookie = context.req.headers.cookie || '';

		const res = await axios.get(`${SERVER}/api/auth/check`, {
			withCredentials: true,
			headers: {
				cookie,
			},
		});

		const userId = res.data.user.id;
		const isFollowed = await (
			await axios.post(`${SERVER}/api/user/follow_check`, {
				userId: id,
				followerId: userId,
			})
		).data.isFollowed;

		return { props: { item, isFollowed } };
	} catch (err) {
		return { props: { errors: err.message } };
	}
};
