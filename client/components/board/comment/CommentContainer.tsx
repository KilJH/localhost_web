import React from 'react';
import styled from 'styled-components';
import { Comment } from '../../../interfaces/index';
import CommentItem from './CommentItem';
import CommentWrite from './CommentWrite';

interface Props {
	comments: Comment[];
	setComments: Function;
	boardId: number;
}

const Container = styled.div`
	background-color: rgba(81, 151, 213, 0.1);
	& h4 {
		margin: 0.5rem 0 1rem 0;
	}
`;

const CommentContainer = (props: Props) => {
	return (
		<Container>
			<h4>댓글[{props.comments.length}]</h4>
			{props.comments.map((comment) => (
				<CommentItem comment={comment} />
			))}
			<CommentWrite
				boardId={props.boardId}
				comments={props.comments}
				setComments={props.setComments}
			/>
		</Container>
	);
};

export default CommentContainer;
