import axios from 'axios';
import Router from 'next/router';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserStateContext } from '../../context/user';
import { useInput } from '../../hooks/useInput';
import SERVER from '../../utils/url';

interface Props {}

const WriteContainer = styled.div`
	margin: 2rem auto;
	width: 80%;
	& > * > * {
		margin: 0.25rem 0;
	}

	& .btnGroup {
		display: flex;
		flex-direction: row-reverse;
		& > button {
			margin: 0 0.25rem;
			width: 4rem;
			&:first-child {
				margin-right: 0;
			}
		}
	}
`;

const TitleInput = styled.input`
	width: 100%;
	&:focus {
		box-shadow: 0 0 0 1px #5197d5;
		border: 1px solid #5197d5;
	}
`;

const ContentInput = styled.textarea`
	width: 100%;
	box-sizing: border-box;
	resize: none;
	border-radius: 0.25rem;
	border: 1px solid #aaa;
	padding: 0.5rem;
	&:focus {
		box-shadow: 0 0 0 1px #5197d5;
		border: 1px solid #5197d5;
		outline: none;
	}
`;

const Button = styled.button`
	background-color: #5197d5;
	color: white;
	border: none;
`;

const BoardWrite = (props: Props) => {
	const title = useInput('');
	const content = useInput('');
	const currentUser = useContext(UserStateContext);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// const parseContent = content.value.toString().replaceAll('\n', '\r\n');
		const res = await axios.post(`${SERVER}/api/board/write`, {
			userId: currentUser.id,
			title: title.value,
			description: content.value,
		});

		res.data.success ? Router.push('/board') : alert(res.data.message);
	};

	return (
		<WriteContainer>
			<form onSubmit={onSubmit}>
				<h6>자유게시판</h6>
				<h2>글 작성</h2>
				<TitleInput placeholder='제목' {...title} />
				<ContentInput rows={32} placeholder='내용' {...content} />
				<TitleInput type='file' />

				<div className='btnGroup'>
					<Button type='submit'>작성</Button>
					<button type='button'>취소</button>
				</div>
			</form>
		</WriteContainer>
	);
};

export default BoardWrite;
