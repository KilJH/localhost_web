import Button from '@material-ui/core/Button';
import axios, { AxiosResponse } from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Notice } from '../../../interfaces';
import SERVER from '../../../utils/url';

const SubTitle = styled.h6`
	color: #5197d5;
	text-indent: 0.1em;
	text-align: left;
	margin: 0 0 0.5em 0.25em;
	display: block;
`;

const Title = styled.textarea`
	font-family: auto;
	width: 98%;
	height: 1.2em;
	padding: 0.5em;
	align-items: left;
	margin-bottom: 2em;
	resize: none;
	overflow: hidden;
	&:focus {
		outline-color: #5197d5;
	}
`;

const Description = styled.textarea`
	font-family: auto;
	width: 98%;
	height: 15em;
	text-align: left;
	margin-left: 0.05em;
	padding: 0.5em;
	font-size: 0.9em;
	resize: none;
	overflow: hidden;
	&:focus {
		outline-color: #5197d5;
	}
`;
const WriteButton = styled(Button)`
	&.MuiButton-root {
		float: right;
		display: block;
		margin: 4em 0 2em 0;
		width: 5em;
	}
	&.MuiButton-containedPrimary {
		background-color: #5197d5;
	}
`;
const DetailsDiv = styled.div``;
const writeNotice = (title: string, description: string) => {
	axios
		.post(`${SERVER}/api/notice/write`, {
			title: title,
			description: description,
		})
		.then((res: AxiosResponse<any>) => {
			if (res.data.success) {
				alert('공지 작성 완료');
				Router.push('/admin/notice/list');
			}
		});
};

export default function NoticeWrite() {
	const [titleState, setTitleState] = useState('');
	const [descState, setDescState] = useState('');
	const writeButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (titleState === '') alert('제목이 비어있습니다.');
		else if (descState === '') alert('내용이 비어있습니다.');
		else writeNotice(titleState, descState);
	};
	return (
		<DetailsDiv>
			<SubTitle>제목</SubTitle>
			<Title
				autoFocus
				placeholder='제목을 입력해주세요.'
				onChange={e => setTitleState(e.target.value)}
			/>
			<SubTitle>내용</SubTitle>
			<Description
				placeholder='내용을 입력해주세요.'
				onChange={e => setDescState(e.target.value)}
			/>
			<WriteButton
				type='submit'
				onClick={writeButtonHandler}
				variant='contained'
				color='primary'
			>
				게시
			</WriteButton>
		</DetailsDiv>
	);
}
