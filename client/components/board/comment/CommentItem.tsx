import React from 'react';
import styled from 'styled-components';
import { Reply } from '../../../interfaces';
import UserPhoto from '../../user/UserPhoto';

interface Props {
	comment: Reply;
}

const Comment = styled.div`
	display: flex;

	& .nickname {
		font-weight: 700;
		margin-bottom: 0.25rem;
	}
`;

const CommentItem = (props: Props) => {
	const { comment } = props;
	return (
		<Comment>
			<UserPhoto src={'/img/default.jpg'} width={4} margin='0 1rem 0 0' />
			<div>
				<div className='nickname'>
					닉네임<span>{comment.createTime}</span>
				</div>
				<div>{comment.description}</div>
			</div>
		</Comment>
	);
};

export default CommentItem;
