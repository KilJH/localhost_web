import React, { useState } from 'react';
import { User } from '../../../../interfaces';
import styled from 'styled-components';
import UserItem from '../../user/UserItem';
import Button from '@material-ui/core/Button';
import Router from 'next/router';

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
export default function HostApprovalList(props: Props) {
  const { items } = props;
  const [state, setState] = useState({});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setState({
      ...state,
      [id]: checked,
    });
  };
  const preHostButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    EnableHostCheckedItems(state);
  };
  const pushBackHandler = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    Router.push('http://localhost:3000/admin/host/approval');
  };

  return (
    <div>
      <UserTable>
        <caption>
          <Title onClick={pushBackHandler}>호스트 요청자 리스트</Title>
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
        <PreHostButton
          type='submit'
          onClick={preHostButtonHandler}
          variant='contained'
          color='primary'
        >
          호스트 승인
        </PreHostButton>
      </ButtonDiv>
    </div>
  );
}
