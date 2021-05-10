import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../components/main/Layout';
import NoticeList from '../../components/notice/NoticeList';
import { Notice } from '../../interfaces';
import SERVER from '../../client/utils/url';

interface Props {
	pageProps: {
		notices: Notice[];
	};
}

const index = ({ pageProps }: Props) => {
	return (
		<Layout title='공지사항 | localhost'>
			<h1>공지사항</h1>
			<NoticeList notices={pageProps.notices} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await axios.get(`${SERVER}/api/notice/list`);
	console.log(res.data);

	return { props: { notices: res.data.notices } };
};

export default index;
