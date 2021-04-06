import React from 'react';
import Search from '../search/Search';
import BoardItem from './BoardItem';
import styled from 'styled-components';
import Link from 'next/link';
import { Board } from '../../interfaces';

interface Props {
	boards: Board[];
}

const BoardContainer = styled.div`
	margin: 1rem 0;
	& > * {
		margin: 0.25rem 0;
	}
`;

const BoardList = (props: Props) => {
	const { boards } = props;
	return (
		<BoardContainer>
			<h2>자유게시판</h2>
			{/* 검색 */}
			<Search
				options={['title', 'content', 'author']}
				label={['제목', '내용', '작성자']}
				onSubmit={(e) => {}}
			/>
			<div>
				{boards.map((board) => (
					<BoardItem board={board} key={board.id} />
				))}
			</div>
			{/* 작성버튼 */}
			<Link href='/board/write'>
				<button>작성</button>
			</Link>
			{/* 페이지네이션 */}
		</BoardContainer>
	);
};

export default BoardList;
