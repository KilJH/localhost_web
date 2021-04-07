import React, { useState } from 'react';
import Search from '../search/Search';
import BoardItem from './BoardItem';
import styled from 'styled-components';
import Link from 'next/link';
import { Board } from '../../interfaces';
import axios from 'axios';
import SERVER from '../../utils/url';
import Pagination from '../main/Pagination';

interface Props {
	boards: Board[];
	page?: number;
	lastIdx: number;
}

const BoardContainer = styled.div`
	margin: 1rem 0;
	& > * {
		margin: 0.25rem 0;
	}
`;

const BoardList = (props: Props) => {
	// const { boards } = props;
	const [boards, setBoards] = useState(props.boards);

	const onSubmit = async (e: React.FormEvent, type, item) => {
		e.preventDefault();
		const res = await axios.post(`${SERVER}/api/board/search`, {
			type: type,
			item: item,
		});

		setBoards(res.data.list);
	};

	return (
		<BoardContainer>
			<h2>자유게시판</h2>
			{/* 검색 */}
			<Search
				options={['title', 'description', 'nickname']}
				label={['제목', '내용', '작성자']}
				onSubmit={onSubmit}
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
			<Pagination
				currentIdx={props.page}
				lastIdx={props.lastIdx}
				url='/board'
				api={`${SERVER}/api/board/list`}
				setItems={setBoards}
			/>
		</BoardContainer>
	);
};

export default BoardList;
