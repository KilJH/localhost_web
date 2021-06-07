import axios from 'axios';
import Link from 'next/link';
import React, { ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useToast } from '../../../client/hooks/useToast';
import { Board } from '../../../interfaces';
import Button from '../../reuse/Button';
import Toast from '../../reuse/Toast';
import MypageLayout from './MypageHeader';

interface Props {
	boards: Board[];
}

const Container = styled.div`
	& > section {
		/* border-bottom: 1px solid #aaa; */
		margin-bottom: 2rem;
		& > header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	& .more {
		padding: 0.25rem;
		font-size: 0.9em;
		text-align: right;
		cursor: pointer;
	}
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	text-align: center;
	& th,
	& td {
		border-bottom: 1px solid #aaa;
		/* width: 25%; */
		overflow: hidden;
	}
	& td {
		padding: 1em 0.5em;
	}
`;

const NoItem = ({ children, col }: { children: ReactNode; col: number }) => (
	<tr>
		<td colSpan={col} style={{ textAlign: 'center' }}>
			{children}
		</td>
	</tr>
);

const BoardItem = React.memo(
	({
		board,
		onDelete,
	}: {
		board: Board;
		onDelete: (id: number) => Promise<void>;
	}) => {
		return (
			<tr>
				<td>{board.createTime}</td>
				<td>
					<Link href='/board/[id]' as={`/board/${board.id}`}>
						<a>{board.title}</a>
					</Link>
				</td>
				<td>{board.hit}</td>
				<td>{board.numOfComment}</td>
				<td>
					<Button default onClick={() => onDelete(board.id)}>
						삭제
					</Button>
				</td>
			</tr>
		);
	},
);

const MyBoard = (props: Props) => {
	const [boards, setBoards] = useState(props.boards);
	const [moreBoard, setMoreBoard] = useState(false);
	const onChangeMoreBoard = () => {
		setMoreBoard(!moreBoard);
	};

	const toast = useToast(false);

	const onDeleteBoard = useCallback(async (id: number) => {
		const yes = confirm('정말 삭제하시겠습니까?');
		if (yes) {
			const res = await axios.post('/api/board/delete', { id });
			if (res.data.success) {
				setBoards(boards => boards.filter(board => board.id !== id));
				toast.handleOpen('success', '게시물을 삭제했습니다.');
			} else {
				toast.handleOpen('error', '게시물 삭제에 실패했습니다.');
			}
		}
	}, []);

	return (
		<MypageLayout tabNum={4}>
			<Container>
				<section>
					<header>
						<h3>내가 쓴 게시글({boards.length})</h3>
					</header>

					<Table>
						<thead>
							<tr>
								<th>날짜</th>
								<th>제목</th>
								<th>조회수</th>
								<th>댓글수</th>
								<th style={{ width: '5em' }}>삭제</th>
							</tr>
						</thead>
						<tbody>
							{boards.length ? (
								(moreBoard ? boards : boards.slice(0, 5)).map(board => (
									<BoardItem
										board={board}
										onDelete={onDeleteBoard}
										key={board.id}
									/>
								))
							) : (
								<NoItem col={5}>작성한 게시물이 없습니다.</NoItem>
							)}
						</tbody>
					</Table>
					{boards!.length > 5 && (
						<div className='more' onClick={onChangeMoreBoard}>
							<a className='more'>더보기</a>
						</div>
					)}
				</section>
			</Container>
			<Toast {...toast}>{toast.message}</Toast>
		</MypageLayout>
	);
};

export default MyBoard;
