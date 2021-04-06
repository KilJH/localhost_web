import React from 'react';
import Search from '../Search';
import BoardItem from './BoardItem';
import styled from 'styled-components';
import Link from 'next/link';

interface Props {}

const sample = {
	id: 1,
	title: 'title',
	content: 'contetnt',
	author: {
		id: 1,
		name: 'kil',
		email: 'string;',
		password: 'string;',
		nickname: 'string;',
		phone: 'string;',
		address: 'string;',
	},
	createTime: '2021-04-03',
	hit: 1,
};

const BoardContainer = styled.div`
	margin: 1rem 0;
`;

const BoardList = (props: Props) => {
	return (
		<BoardContainer>
			<h2>자유게시판</h2>
			{/* 검색 */}
			<Search
				options={['title', 'content', 'author']}
				label={['제목', '내용', '작성자']}
				onSubmit={(e) => {}}
			/>
			<BoardItem board={sample} />
			<BoardItem board={sample} />

			{/* 작성버튼 */}
			<Link href='/board/write'>
				<button>작성</button>
			</Link>
			{/* 페이지네이션 */}
		</BoardContainer>
	);
};

export default BoardList;
