import { GetServerSideProps } from 'next';
import { Plan } from '../../../interfaces';
import React from 'react';
import SERVER from '../../../client/utils/url';
import axios from 'axios';
import AdminLayout from '../../../components/admin/AdminLayout';
import PlanDetail from '../../../components/admin/plan/PlanDetail';

type Props = {
	pageProps: {
		item: Plan;
	};
};

const list = ({ pageProps }: Props) => (
	<AdminLayout title='플랜 정보' selected='plan'>
		<PlanDetail {...pageProps} />
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
