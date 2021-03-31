import React, { useState, useEffect } from 'react';
import { User } from '../../interfaces';
import styled from 'styled-components';
import UserItem from './UserItem';
import Button from '@material-ui/core/Button';
import axios, { AxiosResponse } from 'axios';
import SERVER from '../../utils/url';
import Router from 'next/router';
import Search from '../Search';

type Props = {
  items: User[];
  search?: User;
  isHost?: boolean;
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
const HostifyItems = (items: User[]) => {
  let hosts: User[] = [];
  items.map((item) =>
    axios
      .post(`${SERVER}/api/user/checkAuth`, {
        id: item.id,
      })
      .then((res: AxiosResponse<any>) => {
        if (res.data.auth === 1) hosts.push(item);
      })
  );
  items = hosts;
};
export default function UserList(props: Props) {
  const { search, items, isHost } = props;
  const [state, setState] = useState({});
  useEffect(() => {
    console.log('hi');
    HostifyItems(props.items);
  });
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
    // let hosts: User[] = [];
    // items.map((item) =>
    //   axios
    //     .post(`${SERVER}/api/user/checkAuth`, {
    //       id: item.id,
    //     })
    //     .then((res: AxiosResponse<any>) => {
    //       if (res.data.auth === 1) hosts.push(item);
    //     })
    // );
  };
  return (
    <div>
      <UserTable>
        <caption>
          <h1>{isHost ? '호스트' : '유저'} 리스트</h1>
          <Search
            items={items}
            selectLabel='검색할 값'
            inputLabel='을 입력하세요.'
            buttonLabel='검색!'
            routePage='http://localhost:3000/admin/user/'
            marginBottom='5rem'
          />
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
            <UserItem
              key={search.id}
              user={search}
              state={state}
              handleChange={handleChange}
            />
          ) : (
            items.map((item) => (
              <UserItem
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
        >
          유저 차단
        </BlockButton>
        <DeleteButton
          type='submit'
          onClick={deleteButtonHandler}
          variant='contained'
          color='secondary'
        >
          유저 삭제
        </DeleteButton>
      </ButtonDiv>
    </div>
  );
}
