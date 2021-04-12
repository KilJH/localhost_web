import Button from '@material-ui/core/Button';
import axios, { AxiosResponse } from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Notice } from '../../../interfaces';
import SERVER from '../../../utils/url';

const MainTitle = styled.h2`
  color: #5197d5;
  text-align: center;
  margin-top: 0;
  margin-bottom: 3em;
  padding-top: 2em;
  border-top: 3px solid #5197d5;
`;

const SubTitle = styled.h6`
  color: #5197d5;
  text-indent: 0.1rem;
  text-align: left;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  display: block;
`;

const Title = styled.textarea`
  font-family: auto;
  width: 98%;
  height: 1.2rem;
  padding: 0.25rem;
  align-items: left;
  resize: none;
  overflow: hidden;
  &:focus {
    outline-color: #5197d5;
  }
`;

const Description = styled.textarea`
  font-family: auto;
  width: 98%;
  height: 15rem;
  text-align: left;
  margin-bottom: 1em;
  margin-left: 0.05em;
  padding: 0.25rem;
  font-size: 0.9em;
  resize: none;
  overflow: hidden;
  &:focus {
    outline-color: #5197d5;
  }
`;
const WriteButton = styled(Button)`
  &.MuiButton-root {
    display: block;
    margin-right: 0.5rem;
    margin-left: auto;
    width: 4rem;
  }
  &.MuiButton-containedPrimary {
    background-color: #5197d5;
  }
`;
const DetailsDiv = styled.div`
  margin-bottom: 4rem;
`;
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
      <MainTitle>공지 작성</MainTitle>
      <SubTitle>제목</SubTitle>
      <Title
        autoFocus
        placeholder='제목을 입력해주세요.'
        onChange={(e) => setTitleState(e.target.value)}
      />
      <SubTitle>내용</SubTitle>
      <Description
        placeholder='내용을 입력해주세요.'
        onChange={(e) => setDescState(e.target.value)}
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
