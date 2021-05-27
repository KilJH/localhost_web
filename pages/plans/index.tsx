import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import SERVER from '../../client/utils/url';
import withAuth from '../../components/main/hoc/withAuth';
import Layout from '../../components/main/Layout';
import PlanList from '../../components/plan/PlanList';
import { Plan } from '../../interfaces';

interface Props {
	pageProps: {
		plans: Plan[];
		lastIdx: number;
		page: number;
	};
}

const index = (props: Props) => {
	const { pageProps } = props;
	return (
		<Layout title='플랜보기 | localhost'>
			<PlanList {...pageProps} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	const url = encodeURI(
		`${SERVER}/api/plan/list?page=${ctx.query.page || 1}&type=${
			ctx.query.type ?? 'title'
		}&item=${ctx.query.item ?? ''}`,
	);
	const res = await axios.get(url);

	return { props: { ...res.data } };
};

export default withAuth(0, 0)(index);
