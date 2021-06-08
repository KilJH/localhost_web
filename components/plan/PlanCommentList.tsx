import axios from 'axios';
import Router from 'next/router';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../client/hooks/useInput';
import { useToast } from '../../client/hooks/useToast';
import { UserStateContext } from '../../context/user';
import { Comment } from '../../interfaces/index';
import Button from '../reuse/Button';
import Textarea from '../reuse/Textarea';
import Toast from '../reuse/Toast';
import UserPhoto from '../user/UserPhoto';

interface Props {
	comments: Comment[];
	planId: number;
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

	&:last-of-type {
		border-bottom: none !important;
	}
`;
const href = id => {
	Router.push(`../users/${id}`);
};
const PlanCommentItem = ({ comment }: ItemProps) => {
	return (
		<ItemContainer>
			<UserPhoto
				src={comment.user.photo || '/img/default.jpg'}
				width={3}
				margin='0 1rem 0 0'
				onClick={() => href(comment.user.id)}
				hover={true}
			/>
			<div>
				<div className='top'>
					<div
						className='nickname'
						onClick={() => href(comment.user.id)}
						style={{ cursor: 'pointer' }}
					>
						{comment.user.nickname}
					</div>
					<div className='time'>{comment.createTime}</div>
				</div>
				<div className='description'>{comment.description}</div>
			</div>
		</ItemContainer>
	);
};

const PlanCommentList = (props: Props) => {
	const { comments: originComments, planId } = props;
	const [comments, setComments] = useState(originComments);
	const comment = useInput('');
	const currentUser = useContext(UserStateContext);

	const toast = useToast(false);

	const onSubmit = async e => {
		// api 완성되면 연결
		e.preventDefault();

		const res = await axios.post(`/api/plan/comment/write`, {
			planId,
			userId: currentUser.id,
			description: comment.value,
		});

		if (res.data.success) {
			setComments([
				...comments,
				{
					user: currentUser,
					description: comment.value as string,
					createTime: '방금 전',
				},
			]);

			comment.setValue('');
		} else
			toast.handleOpen(
				'error',
				res.data.message || '댓글 작성에 실패했습니다.',
			);
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
			<Toast {...toast}>{toast.message}</Toast>
		</Container>
	);
};

export default PlanCommentList;
