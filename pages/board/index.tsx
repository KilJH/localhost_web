import axios from 'axios';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import React from 'react';
import SERVER from '../../client/utils/url';
import BoardList from '../../components/board/BoardList';
import withAuth from '../../components/main/hoc/withAuth';
import Layout from '../../components/main/Layout';
import { Board } from '../../interfaces';

interface Props {
	pageProps: {
		pagedBoards: Board[];
		lastIdx: number;
		page: number;
		query: ParsedUrlQuery;
	};
}

const index = ({ pageProps }: Props) => {
	return (
		<Layout title='자유게시판 | localhost'>
			<BoardList {...pageProps} />
		</Layout>
	);
};

export default withAuth(0, 0)(index);

export const getServerSideProps: GetServerSideProps = async ctx => {
	const { page, type, item } = ctx.query;
	const url = encodeURI(
		`${SERVER}/api/board/list?page=${page || 1}&type=${type || 'title'}&item=${
			item || ''
		}`,
	);
	const res = await axios.get(url);
	return {
		props: { ...res.data, query: ctx.query },
	};
};
