import React, { useState, useEffect } from 'react';
import { User } from '../../../interfaces';
import styled from 'styled-components';
import NoticeItem from './NoticeItem';
import Button from '@material-ui/core/Button';
import axios, { AxiosResponse } from 'axios';
import SERVER from '../../../utils/url';
import Router from 'next/router';

type Props = {
  items: User[];
  search?: User;
  isHost?: boolean;
  isPreHost?: boolean;
};

const UserTable = styled.table`
  width: 100%;
  min-width: 32rem;
  max-width: 80rem;
  margin: 0 auto;
  text-align: center;
  border-collapse: collapse;
  & th {
    font-size: 1rem;
  }
  & thead {
    border-bottom: 2px solid black;
  }
  & td {
    border-bottom: 1px solid black;
  }
`;

const ButtonDiv = styled.div`
  width: fit-content;
  display: flex;
  margin: 0 auto;
  margin-top: 1rem;
`;

const BlockButton = styled(Button)`
  &.MuiButton-root {
    margin: 1rem;
    width: 6rem;
  }
  &.MuiButton-containedPrimary {
    background-color: #5197d5;
  }
`;

const DeleteButton = styled(Button)`
  &.MuiButton-root {
    margin: 1rem;
    width: 6rem;
  }
  &.MuiButton-containedSecondary {
    background-color: #ff6b81;
  }
`;
const HostButton = styled(Button)`
  &.MuiButton-root {
    margin: 1rem;
    width: 8rem;
  }
  &.MuiButton-containedSecondary {
    background-color: #ff6b81;
  }
`;
const PreHostButton = styled(Button)`
  &.MuiButton-root {
    margin: 1rem;
    width: 8rem;
  }
  &.MuiButton-containedPrimary {
    background-color: #5197d5;
  }
`;
const Title = styled.h1`
  cursor: pointer;
`;
const DeleteCheckedItems = (state) => {
  const keys = Object.keys(state);
  const values = Object.values(state);
  for (let i = 0; i < values.length; i++) {
    if (values[i] === true) {
      axios
        .post(`${SERVER}/api/user/delete`, {
          userId: keys[i],
        })
        .then((res: AxiosResponse<any>) => {
          console.log(res.data);
          alert(res.data.message);
          if (res.data.success) {
            Router.push('/admin/user/list');
          }
        });
    }
  }
};
const DisableHostCheckedItems = (state) => {
  // 호스트 해제 기능
  // const keys = Object.keys(state);
  // const values = Object.values(state);
  // for (let i = 0; i < values.length; i++) {
  //   if (values[i] === true) {
  //     axios
  //       .post(`${SERVER}/api/user/host/disable'`, {
  //         userId: keys[i],
  //       })
  //       .then((res: AxiosResponse<any>) => {
  //         console.log(res.data);
  //         alert(res.data.message);
  //         if (res.data.success) {
  //           Router.push('/admin/host/disable');
  //         }
  //       });
  //   }
  // }
};
const EnableHostCheckedItems = (state) => {
  // 호스트 승인 기능
  // const keys = Object.keys(state);
  // const values = Object.values(state);
  // for (let i = 0; i < values.length; i++) {
  //   if (values[i] === true) {
  //     axios
  //       .post(`${SERVER}/api/user/host/approve'`, {
  //         userId: keys[i],
  //       })
  //       .then((res: AxiosResponse<any>) => {
  //         console.log(res.data);
  //         alert(res.data.message);
  //         if (res.data.success) {
  //           Router.push('/admin/host/approve');
  //         }
  //       });
  //   }
  // }
};
export default function NoticeList(props: Props) {
  const { search, items, isHost, isPreHost } = props;
  const [state, setState] = useState({});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setState({
      ...state,
      [id]: checked,
    });
  };
  const deleteButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    DeleteCheckedItems(state);
  };
  const blockButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(items);
  };
  const hostButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    DisableHostCheckedItems(state);
  };
  const preHostButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    EnableHostCheckedItems(state);
  };
  const pushBackHandler = (e: React.MouseEvent<HTMLHeadingElement>) => {
    let url: string;
    isHost
      ? (url = 'http://localhost:3000/admin/host/list')
      : isPreHost
      ? (url = 'http://localhost:3000/admin/host/approval')
      : (url = 'http://localhost:3000/admin/user/list');
    Router.push(url);
  };
  return (
    <div>
      <UserTable>
        <caption>
          <Title onClick={pushBackHandler}>
            {isHost ? '호스트' : isPreHost ? '호스트 신청자' : '유저'} 리스트
          </Title>
        </caption>
        <thead>
          <tr>
            <th>선택</th>
            <th>이메일</th>
            <th>닉네임</th>
            <th>이름</th>
            <th>회원분류</th>
          </tr>
        </thead>
        <tbody>
          {search ? (
            <NoticeItem
              key={search.id}
              user={search}
              state={state}
              handleChange={handleChange}
            />
          ) : (
            items.map((item) => (
              <NoticeItem
                key={item.id}
                user={item}
                state={state}
                handleChange={handleChange}
              />
            ))
          )}
        </tbody>
      </UserTable>
      <ButtonDiv>
        <BlockButton
          type='button'
          onClick={blockButtonHandler}
          variant='contained'
          color='primary'
          style={
            isHost || isPreHost ? { display: 'none' } : { display: 'default' }
          }
        >
          유저 차단
        </BlockButton>
        <DeleteButton
          type='submit'
          onClick={deleteButtonHandler}
          variant='contained'
          color='secondary'
          style={
            isHost || isPreHost ? { display: 'none' } : { display: 'default' }
          }
        >
          유저 삭제
        </DeleteButton>
        <HostButton
          type='submit'
          onClick={hostButtonHandler}
          variant='contained'
          color='secondary'
          style={isHost ? { display: 'default' } : { display: 'none' }}
        >
          호스트 해제
        </HostButton>
        <PreHostButton
          type='submit'
          onClick={preHostButtonHandler}
          variant='contained'
          color='primary'
          style={isPreHost ? { display: 'default' } : { display: 'none' }}
        >
          호스트 승인
        </PreHostButton>
      </ButtonDiv>
    </div>
  );
}
