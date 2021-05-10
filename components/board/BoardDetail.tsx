import React, { useState } from 'react';
import styled from 'styled-components';
import { Board, Comment } from '../../interfaces';
import UserPhoto from '../user/UserPhoto';
import CommentContainer from './comment/CommentContainer';

interface Props {
	board: Board;
	comments: Comment[];
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
		display: flex;
		align-items: center;
	}
	& .content {
		white-space: pre;
	}
`;

const BoardDetail = (props: Props) => {
	const { board, comments } = props;
	const [commentsState, setCommentsState] = useState(comments);
	return (
		<BoardContainer>
			{/* 제목 */}
			<div className='title'>
				<h4>{board.title}</h4>
				<div>{board.createTime}</div>
			</div>
			{/* 작성자와 작성일, 조회수, 댓글 수 */}
			<div className='meta'>
				<UserPhoto src={board.author.photo} width={2} margin='0 0.5rem 0 0' />
				{board.author.nickname}, 조회 {board.hit || 0}, 댓글{' '}
				{board.numOfComment || 0}
			</div>

			{/* 버튼들 */}
			{/* 내용 */}
			<div className='content'>{board.description}</div>
			{/* 버튼들 */}
			{/* 이전, 다음, 목록 */}

			{/* 댓글 */}
			<CommentContainer
				boardId={board.id}
				comments={commentsState}
				setComments={setCommentsState}
			/>
		</BoardContainer>
	);
};

export default BoardDetail;
