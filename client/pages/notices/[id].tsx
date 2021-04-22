import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Layout from '../../components/main/Layout';
import NoticeDetail from '../../components/notice/NoticeDetail';
import NoticeList from '../../components/notice/NoticeList';
import { Notice } from '../../interfaces';
import SERVER from '../../utils/url';

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

export default NoticeDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
	// Get the paths we want to pre-render based on users
	const paths = await (
		await axios.get(`${SERVER}/api/notice/list`)
	).data.notices.map(notice => ({
		params: { id: notice.id.toString() },
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
