import React from 'react';
import Layout from '../../components/main/Layout';
import Mypage from '../../components/user/Mypage';
import { sampleUserData } from '../../utils/sample-data';
import { User } from '../../interfaces/index';
import { GetStaticProps } from 'next';

interface Props {
	pageProps: {
		item: User;
	};
}

const mypage = ({ pageProps }: Props) => {
	return (
		<Layout title="마이페이지 | localhost">
			<Mypage user={pageProps.item} />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.
	const item: User = sampleUserData[0];
	return { props: { item } };
};

export default mypage;
