import axios from 'axios';
import { GetStaticProps } from 'next';
import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import NoticeWrite from '../../../components/admin/notice/NoticeWrite';
import Layout from '../../../components/main/Layout';
import { Notice } from '../../../interfaces';
import SERVER from '../../../utils/url';

type Props = {
	pageProps: {
		items: Notice[];
	};
};

const write = ({ pageProps }: Props) => {
	return (
		<AdminLayout title='공지작성' selected='notice'>
			<NoticeWrite />
		</AdminLayout>
	);
};
export const getStaticProps: GetStaticProps = async () => {
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.
	const items: Notice[] = await (await axios.get(`${SERVER}/api/notice/list`))
		.data.notices;
	return { props: { items } };
};
export default write;
