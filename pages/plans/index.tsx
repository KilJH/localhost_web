import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import SERVER from '../../client/utils/url';
import Layout from '../../components/main/Layout';
import PlanList from '../../components/plan/PlanList';
import { Plan } from '../../interfaces';

interface Props {
	pageProps: {
		plans?: Plan[];
	};
}

const index = (props: Props) => {
	const { pageProps } = props;

	return (
		<Layout title='플랜보기 | localhost'>
			<PlanList plans={pageProps.plans || []} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await axios.get(`${SERVER}/api/plan/list`);

	return { props: { plans: res.data.list } };
};

export default index;
