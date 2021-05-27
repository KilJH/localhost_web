import React, { useEffect, useState } from 'react';
import Search from '../search/Search';
import BoardItem from './BoardItem';
import styled from 'styled-components';
import Link from 'next/link';
import { Board } from '../../interfaces';
import axios from 'axios';
import Pagination from '../main/Pagination';

interface Props {
	pagedBoards: Board[];
	lastIdx: number;
	page: number;
}

const BoardContainer = styled.div`
	margin: 1rem 0;
	& > * {
		margin: 0.25rem 0;
	}
`;

const BoardList = (props: Props) => {
	const { pagedBoards, lastIdx, page } = props;
	const [boards, setBoards] = useState<Board[]>(pagedBoards);
	const [pageState, setPageState] = useState(page);

	const onClickPage = idx => {
		setPageState(idx);
	};

	useEffect(() => {
		axios.get(`/api/board/list?page=${pageState}`).then(res => {
			setBoards(res.data.pagedBoards);
		});
	}, [pageState]);

	return (
		<BoardContainer>
			<h2>자유게시판</h2>
			{/* 검색 */}
			<Search
				options={['title', 'description', 'nickname']}
				label={['제목', '내용', '작성자']}
				onSubmit={() => {}}
			/>
			<div>
				{boards?.map(board => (
					<BoardItem board={board} key={board.id} />
				))}
			</div>
			{/* 작성버튼 */}
			<Link href='/board/write'>
				<button>작성</button>
			</Link>
			{/* 페이지네이션 */}
			<Pagination
				currentIdx={pageState}
				lastIdx={lastIdx}
				url='/board?'
				api={`/api/board/list`}
				onClick={onClickPage}
			/>
		</BoardContainer>
	);
};

export default BoardList;
