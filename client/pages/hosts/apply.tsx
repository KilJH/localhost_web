import React from 'react';
import { GetStaticProps } from 'next';
import { User } from '../../interfaces/index';
import axios from 'axios';
import SERVER from '../../utils/url';
import Layout from '../../components/main/Layout';
import Apply from '../../components/host/Apply';

interface Props {
	pageProps: {
		user: User;
	};
}

const apply = (props: Props) => {
	return (
		<Layout title="호스트신청 | localhost">
			<Apply />
		</Layout>
	);
};

export default apply;

// 현재 id 가져오기
// export const getStaticProps: GetStaticProps = async () => {
// 	const res = await axios.get(`${SERVER}/api/user/${12}`);
// 	const user: User = res.data.user;
// 	return { props: { user } };
// };
