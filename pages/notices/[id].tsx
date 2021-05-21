import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../components/main/Layout';
import NoticeDetail from '../../components/notice/NoticeDetail';
import NoticeList from '../../components/notice/NoticeList';
import { Notice } from '../../interfaces';
import SERVER from '../../client/utils/url';
import withAuth from '../../components/main/hoc/withAuth';

interface Props {
	pageProps: {
		notice: Notice;
		recentNotices: Notice[];
	};
}

const NoticeDetailPage = ({ pageProps }: Props) => {
	return (
		<Layout title={`${pageProps.notice.title} | localhost`}>
			<NoticeDetail notice={pageProps.notice} />

			<hr />
			<h3>최근 공지</h3>
			<NoticeList notices={pageProps.recentNotices} />
		</Layout>
	);
};

export default withAuth(0, 0)(NoticeDetailPage);

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	try {
		const id = params?.id;
		const res = await axios.get(`${SERVER}/api/notice/${id}`);
		const notice = res.data.notice;

		const recRes = await axios.get(`${SERVER}/api/notice/list`);
		const recentNotices = recRes.data.notices.splice(0, 3);

		return { props: { notice, recentNotices } };
	} catch (err) {
		return { props: { errors: err.message } };
	}
};
