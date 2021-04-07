import React, { useState } from 'react';
import { Host } from '../../../../interfaces';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Router from 'next/router';
import { IconButton } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import SERVER from '../../../../utils/url';
import HostApprovalItem from './HostApprovalItem';
import HostApprovalDetail from './HostApprovalDetail';

type Props = {
  items: Host[];
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
const HostDenialButton = styled(Button)`
  &.MuiButton-root {
    margin: 1rem;
    width: 8rem;
  }
  &.MuiButton-containedSecondary {
    background-color: #ff6b81;
  }
`;
const HostApprovalButton = styled(Button)`
  &.MuiButton-root {
    margin: 1rem;
    width: 8rem;
  }
  &.MuiButton-containedPrimary {
    background-color: #5197d5;
  }
`;
const CssTh = styled.th`
  padding-left: 1rem;
`;

const CssIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    padding: 0;
  }
`;
const DenyCheckedItems = (state) => {
  // 호스트 승인 거부 기능
  const keys = Object.keys(state);
  const values = Object.values(state);
  for (let i = 0; i < values.length; i++) {
    if (values[i] === true) {
      axios
        .post(`${SERVER}/api/user/host/deny`, {
          userId: keys[i],
        })
        .then((res: AxiosResponse<any>) => {
          console.log(res.data);
          alert(res.data.message);
          if (res.data.success) {
            Router.push('/admin/host/approval');
          }
        });
    }
  }
};
const ApproveCheckedItems = (state) => {
  // 호스트 승인 기능
  const keys = Object.keys(state);
  const values = Object.values(state);
  for (let i = 0; i < values.length; i++) {
    if (values[i] === true) {
      axios
        .post(`${SERVER}/api/user/host/allow`, {
          userId: keys[i],
        })
        .then((res: AxiosResponse<any>) => {
          console.log(res.data);
          alert(res.data.message);
          if (res.data.success) {
            Router.push('/admin/host/approval');
          }
        });
    }
  }
};
export default function HostApprovalList(props: Props) {
  const { items } = props;
  const [state, setState] = useState({});
  const [userState, setUserState] = useState(items[0]);
  const [emailState, setEmailState] = useState(false);
  const [nicknameState, setNicknameState] = useState(false);
  const [nameState, setNameState] = useState(false);
  const [detailState, setDetailState] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setState({
      ...state,
      [id]: checked,
    });
  };
  const HostDenialButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    DenyCheckedItems(state);
  };
  const HostApprovalButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    ApproveCheckedItems(state);
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
          <h1>호스트 신청자 리스트</h1>
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
            <HostApprovalItem
              key={item.id}
              user={item}
              state={state}
              handleChange={handleChange}
              setUserState={setUserState}
              setDetailState={setDetailState}
            />
          ))}
        </tbody>
      </UserTable>
      <HostApprovalDetail user={userState} visibility={detailState} />
      <ButtonDiv>
        <HostDenialButton
          type='submit'
          onClick={HostDenialButtonHandler}
          variant='contained'
          color='secondary'
        >
          승인거부
        </HostDenialButton>
        <HostApprovalButton
          type='submit'
          onClick={HostApprovalButtonHandler}
          variant='contained'
          color='primary'
        >
          승인
        </HostApprovalButton>
      </ButtonDiv>
    </div>
  );
}
