import React, { useEffect, useState } from 'react';
import Search from '../search/Search';
import BoardItem from './BoardItem';
import styled from 'styled-components';
import Link from 'next/link';
import { Board } from '../../interfaces';
import axios from 'axios';
import Pagination from '../main/Pagination';
import { ParsedUrlQuery } from 'node:querystring';

interface Props {
	pagedBoards: Board[];
	lastIdx: number;
	page: number;
	query: ParsedUrlQuery;
}

const BoardContainer = styled.div`
	margin: 1rem 0;
	& > * {
		margin: 0.25rem 0;
	}
`;

const BoardList = (props: Props) => {
	const { pagedBoards, lastIdx, page, query } = props;
	const [boards, setBoards] = useState<Board[]>(pagedBoards);

	// 브라우저 상 주소를 위한 url
	const url = query.item
		? `/board/?type=${query.type}&item=${query.item}&`
		: `/board/?`;

	const onPageClick = async idx => {
		location.href = query.item
			? `/board?type=${query.type}&item=${query.item}&page=${idx}`
			: `/board?page=${idx}`;
	};

	const searchProps = {
		options: ['title', 'description', 'nickname'],
		label: ['제목', '내용', '작성자'],
		onSubmit: (e, type, input) => {
			e.preventDefault();

			location.href = `/board?type=${type}&item=${input}`;
		},
	};

	return (
		<BoardContainer>
			<h2>자유게시판</h2>
			{/* 검색 */}
			<Search {...searchProps} />
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
				lastIdx={lastIdx}
				currentIdx={page}
				onClick={onPageClick}
				url={url}
			/>
		</BoardContainer>
	);
};

export default BoardList;
