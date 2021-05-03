import { GetServerSideProps, GetStaticProps } from 'next';
import { Plan } from '../../../interfaces';
import React from 'react';
import SERVER from '../../../utils/url';
import axios from 'axios';
import AdminLayout from '../../../components/admin/AdminLayout';
import PlanPage from '../../../components/admin/plan/PlanPage';

type Props = {
	pageProps: {
		item: Plan;
	};
};

const list = ({ pageProps }: Props) => (
	<AdminLayout title='플랜목록' selected='plan'>
		{/* <PlanPage {...pageProps} /> */}
	</AdminLayout>
);

export const getServerSideProps: GetServerSideProps = async context => {
	const id = context.params?.id;
	const item: Plan[] = await (
		await axios.post(`${SERVER}/api/plan/load`, {
			id: id,
		})
	).data.plan;
	return { props: { item } };
};

export default list;
