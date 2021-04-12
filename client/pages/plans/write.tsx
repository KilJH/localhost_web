import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../../components/main/Layout';
import PlanWrite from '../../components/plan/PlanWrite';

interface Props {}

const write = (props: Props) => {
	return (
		<Layout title='플랜 작성 | localhost'>
			<PlanWrite />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};

export default write;
