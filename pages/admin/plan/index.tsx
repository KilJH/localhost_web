import { GetServerSideProps } from 'next';
import { Plan } from '../../../interfaces';
import React from 'react';
import SERVER from '../../../client/utils/url';
import axios from 'axios';
import AdminLayout from '../../../components/admin/AdminLayout';
import PlanPage from '../../../components/admin/plan/PlanPage';
import withAuth from '../../../components/main/hoc/withAuth';

type Props = {
	pageProps: {
		items: Plan[];
	};
};

const list = ({ pageProps }: Props) => (
	<AdminLayout title='플랜목록' selected='plan'>
		<PlanPage {...pageProps} />
	</AdminLayout>
);

export const getServerSideProps: GetServerSideProps = async () => {
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.

	const items: Plan[] = await (
		await axios.get(`${SERVER}/api/plan/list`)
	).data.list;
	return { props: { items } };
};

export default withAuth(1, 2)(list);
