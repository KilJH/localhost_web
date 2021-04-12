import Button from '@material-ui/core/Button';
import axios, { AxiosResponse } from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Notice } from '../../../interfaces';
import SERVER from '../../../utils/url';

type Props = {
  item?: Notice;
  visibility: boolean;
};

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
const ModifyButton = styled(Button)`
  &.MuiButton-root {
    display: block;
    margin-right: 0.5rem;
    margin-left: auto;
    margin-bottom: 2rem;
    width: 4rem;
  }
  &.MuiButton-containedPrimary {
    background-color: #5197d5;
  }
`;
const DetailsDiv = styled.div`
  border-bottom: 3px solid #5197d5;
`;
const modifyNotice = (id, title, description) => {
  axios
    .post(`${SERVER}/api/notice/update`, {
      id: id,
      title: title,
      description: description,
    })
    .then((res: AxiosResponse<any>) => {
      if (res.data.success) {
        Router.push('/admin/notice/list');
      }
      alert(res.data.message);
    });
};

export default function NoticeUpdate(props: Props) {
  const { item, visibility } = props;
  const [titleState, setTitleState] = useState(item.title);
  const [descState, setDescState] = useState(item.description);
  const modifyButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    modifyNotice(item.id, titleState, descState);
  };
  if (visibility === true) {
    return (
      <DetailsDiv>
        <MainTitle>공지 수정</MainTitle>
        <SubTitle>제목</SubTitle>
        <Title
          autoFocus
          value={titleState}
          onChange={(e) => setTitleState(e.target.value)}
        />
        <SubTitle>내용</SubTitle>
        <Description
          // placeholder={item.description}
          value={descState}
          onChange={(e) => setDescState(e.target.value)}
        />
        <ModifyButton
          type='submit'
          onClick={modifyButtonHandler}
          variant='contained'
          color='primary'
        >
          수정
        </ModifyButton>
      </DetailsDiv>
    );
  } else {
    return <div></div>;
  }
}
