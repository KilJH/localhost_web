import React, { useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../client/hooks/useInput';
import { Comment } from '../../interfaces/index';
import Button from '../reuse/Button';
import Textarea from '../reuse/Textarea';
import UserPhoto from '../user/UserPhoto';

interface Props {
	comments: Comment[];
}
interface ItemProps {
	comment: Comment;
}

const Container = styled.section`
	& form {
		position: relative;
		& .btnContainer {
			& button {
				position: absolute;
				right: 1em;
				bottom: 1em;
			}
		}
	}
`;

const ItemContainer = styled.section`
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

const PlanCommentItem = ({ comment }: ItemProps) => {
	return (
		<ItemContainer>
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
		</ItemContainer>
	);
};

const PlanCommentList = (props: Props) => {
	const { comments: originComments } = props;
	const [comments, setComments] = useState(originComments);
	const comment = useInput('');

	const onSubmit = e => {
		// api 완성되면 연결
		e.preventDefault();

		// if (res.data.success) {
		// 	props.setComments([
		// 		...props.comments,
		// 		{
		// 			user: currentUser,
		// 			description: comment,
		// 			createTime: '방금 전',
		// 		},
		// 	]);

		// 	comment.setValue('');
		// } else alert(res.data.message);
	};
	return (
		<Container>
			<h4>댓글[{comments.length}]</h4>
			{comments.map(comment => (
				<PlanCommentItem comment={comment} key={comment.id} />
			))}

			<form>
				<Textarea {...comment} height='10em' />
				<div className='btnContainer'>
					<Button type='submit' onClick={onSubmit}>
						작성
					</Button>
				</div>
			</form>
		</Container>
	);
};

export default PlanCommentList;
