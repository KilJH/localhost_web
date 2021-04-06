import React, { useState } from 'react';
import { User } from '../../../interfaces';
import styled from 'styled-components';
import UserItem from '../user/UserItem';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Router from 'next/router';
import { IconButton } from '@material-ui/core';

type Props = {
  items: User[];
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
const HostButton = styled(Button)`
  &.MuiButton-root {
    margin: 1rem;
    width: 8rem;
  }
  &.MuiButton-containedSecondary {
    background-color: #ff6b81;
  }
`;
const Title = styled.h1`
  cursor: pointer;
`;
const CssTh = styled.th`
  padding-left: 1rem;
`;

const CssIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    padding: 0;
  }
`;
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
export default function HostList(props: Props) {
  const { items } = props;
  const [state, setState] = useState({});
  const [emailState, setEmailState] = useState(false);
  const [nicknameState, setNicknameState] = useState(false);
  const [nameState, setNameState] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setState({
      ...state,
      [id]: checked,
    });
  };
  const hostButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    DisableHostCheckedItems(state);
  };
  const pushBackHandler = (e: React.MouseEvent<HTMLHeadingElement>) => {
    Router.push('http://localhost:3000/admin/host/list');
  };
  const emailSortHandler = () => {
    setNameState(false);
    setNicknameState(false);
    setEmailState(!emailState);
    if (emailState) {
      items.sort(function (a: any, b: any) {
        return a.email < b.email ? -1 : a.email > b.email ? 1 : 0;
      });
    } else {
      items.sort(function (a: any, b: any) {
        return a.email > b.email ? -1 : a.email < b.email ? 1 : 0;
      });
    }
  };
  const nicknameSortHandler = () => {
    setEmailState(false);
    setNameState(false);
    setNicknameState(!nicknameState);
    if (nicknameState) {
      items.sort(function (a: any, b: any) {
        return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
      });
    } else {
      items.sort(function (a: any, b: any) {
        return a.nickname > b.nickname ? -1 : a.nickname < b.nickname ? 1 : 0;
      });
    }
  };
  const nameSortHandler = () => {
    setEmailState(false);
    setNicknameState(false);
    setNameState(!nameState);
    if (nameState) {
      items.sort(function (a: any, b: any) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    } else {
      items.sort(function (a: any, b: any) {
        return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
      });
    }
  };
  return (
    <div>
      <UserTable>
        <caption>
          <Title onClick={pushBackHandler}>호스트 리스트</Title>
        </caption>
        <thead>
          <tr>
            <th>선택</th>
            <CssTh>
              이메일
              <CssIconButton onClick={emailSortHandler}>
                {emailState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </CssIconButton>
            </CssTh>
            <CssTh>
              닉네임
              <CssIconButton onClick={nicknameSortHandler}>
                {nicknameState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </CssIconButton>
            </CssTh>
            <CssTh>
              이름
              <CssIconButton onClick={nameSortHandler}>
                {nameState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </CssIconButton>
            </CssTh>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <UserItem
              key={item.id}
              user={item}
              state={state}
              handleChange={handleChange}
            />
          ))}
        </tbody>
      </UserTable>
      <ButtonDiv>
        <HostButton
          type='submit'
          onClick={hostButtonHandler}
          variant='contained'
          color='secondary'
        >
          호스트 해제
        </HostButton>
      </ButtonDiv>
    </div>
  );
}
