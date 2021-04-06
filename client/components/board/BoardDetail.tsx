import React from 'react';
import styled from 'styled-components';
import { Board, Reply } from '../../interfaces';
import CommentItem from './comment/CommentItem';
import CommentWrite from './comment/CommentWrite';

interface Props {
	board: Board;
	comments: Reply[];
}

const BoardContainer = styled.div`
	& > .title {
		display: flex;
		align-items: center;
		line-height: 160%;
		background-color: rgba(81, 151, 213, 0.3);
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

const CommentContainer = styled.div`
	background-color: rgba(81, 151, 213, 0.1);
	& h4 {
		margin: 0.5rem 0 1rem 0;
	}
`;

const BoardDetail = (props: Props) => {
	const { board, comments } = props;
	console.log(props);
	return (
		<BoardContainer>
			{/* 제목 */}
			<div className='title'>
				<h4>{board.title}</h4>
				<div>{board.createTime}</div>
			</div>
			{/* 작성자와 작성일, 조회수, 댓글 수 */}
			<div className='meta'>
				{board.author.nickname}, {board.hit}, 댓글수
			</div>

			{/* 버튼들 */}
			{/* 내용 */}
			<div className='content'>{board.description}</div>
			{/* 버튼들 */}

			{/* 댓글 */}
			<CommentContainer>
				<h4>댓글[댓글 수]</h4>
				{comments.map((reply) => (
					<CommentItem comment={reply} />
				))}
				<CommentWrite />
			</CommentContainer>
		</BoardContainer>
	);
};

export default BoardDetail;
