import React from 'react';
import styled from 'styled-components';
import { Board, Reply } from '../../interfaces';

interface Props {
	board: Board;
	replies: Reply[];
}

const BoardContainer = styled.div`
	& > .title {
		display: flex;
		align-items: center;
		line-height: 160%;
		background-color: #eee;
		& > *:first-child {
			flex: 1;
			margin: 0;
		}
		& > *:last-child {
			font-size: 0.8em;
		}
	}
	& > div {
		padding: 0.5rem 1rem;
		border-bottom: 1px solid #aaa;
	}
	& .meta {
		padding: 0.25rem 1rem;
		font-size: 0.8em;
	}
	& .content {
	}
`;

const BoardDetail = (props: Props) => {
	const { board, replies } = props;
	return (
		<BoardContainer>
			{/* 제목 */}
			<div className='title'>
				<h4>{board.title}</h4>
				<div>{board.createTime}</div>
			</div>
			{/* 작성자와 작성일, 조회수, 댓글 수 */}
			<div className='meta'>
				{333}, {board.hit}, 댓글수
			</div>

			{/* 버튼들 */}
			{/* 내용 */}
			<div className='content'>{board.description}</div>
			{/* 버튼들 */}

			{/* 댓글 */}
			<div>
				{replies.map((reply) => (
					<div>{reply.description}</div>
				))}
			</div>
		</BoardContainer>
	);
};

export default BoardDetail;
