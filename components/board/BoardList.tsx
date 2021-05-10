import React, { useEffect, useState } from 'react';
import Search from '../search/Search';
import BoardItem from './BoardItem';
import styled from 'styled-components';
import Link from 'next/link';
import { Board } from '../../interfaces';
import axios from 'axios';
import SERVER from '../../client/utils/url';
import Pagination from '../main/Pagination';
import { useAsync } from 'react-async';
import Loading from '../reuse/Loading';

const BoardContainer = styled.div`
	margin: 1rem 0;
	& > * {
		margin: 0.25rem 0;
	}
`;

const getBoards = async ctx => {
	const { page } = ctx;
	try {
		const res = await axios.get(`/api/board/list?page=${page}`);
		console.log(res.data);
		return res.data;
	} catch (err) {
		return console.log(err);
	}
};

const BoardList = () => {
	// const { boards } = props;
	const [boards, setBoards] = useState<Board[]>([]);
	const [pageState, setPageState] = useState(1);

	// const onSubmit = async (e: React.FormEvent, type, item) => {
	// 	e.preventDefault();
	// 	const res = await axios.post(`${SERVER}/api/board/search`, {
	// 		type: type,
	// 		item: item,
	// 	});

	// 	setBoards(res.data.list);
	// };

	const onClickPage = idx => {
		setPageState(idx);
	};

	const { data, error, isLoading } = useAsync({
		promiseFn: getBoards,
		page: pageState,
	});

	useEffect(() => {
		setBoards(data?.pagedBoards ?? []);
	}, [data]);

	useEffect(() => {
		console.log(pageState);
		axios.get(`/api/board/list?page=${pageState}`).then(res => {
			setBoards(res.data.pagedBoards);
		});
	}, [pageState]);

	if (isLoading) return <Loading />;
	if (error)
		return (
			<div style={{ fontSize: '0.5em', color: '#e74c3c' }}>!!!에러!!!</div>
		);
	if (!data) return null;

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
				{boards.map(board => (
					<BoardItem board={board} key={board.id} />
				))}
			</div>
			{/* 작성버튼 */}
			<Link href='/board/write'>
				<button>작성</button>
			</Link>
			{/* 페이지네이션 */}
			<Pagination
				currentIdx={data.page!}
				lastIdx={data.lastIdx}
				url='/board'
				api={`${SERVER}/api/board/list`}
				// setItems={setBoards}
				onClick={onClickPage}
			/>
		</BoardContainer>
	);
};

export default BoardList;
