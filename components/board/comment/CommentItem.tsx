import React from 'react';
import styled from 'styled-components';
import { Comment } from '../../../interfaces';
import UserPhoto from '../../user/UserPhoto';

interface Props {
	comment: Comment;
}

const CommentItemContainer = styled.div`
	display: flex;
	padding: 0.5rem 0;
	border-bottom: 1px solid #aaa;
	& > div:last-child {
		flex: 1;
	}
	& .top {
		margin-bottom: 0.25rem;
		display: flex;
		font-size: 0.8em;
		& .nickname {
			flex: 1;
			font-weight: 700;
		}
		& .time {
			flex: 1;
			margin-left: 0.5rem;
			font-weight: 400;
			text-align: right;
			color: #aaa;
		}
	}
	& .description {
		font-size: 0.9em;
		white-space: pre;
	}
`;

const CommentItem = (props: Props) => {
	const { comment } = props;
	return (
		<CommentItemContainer>
			<UserPhoto
				src={comment.user.photo || '/img/default.jpg'}
				width={3}
				margin='0 1rem 0 0'
			/>
			<div>
				<div className='top'>
					<div className='nickname'>{comment.user.nickname}</div>
					<div className='time'>{comment.createTime}</div>
				</div>
				<div className='description'>{comment.description}</div>
			</div>
		</CommentItemContainer>
	);
};

export default CommentItem;
