import { User } from '../../interfaces';
import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';

type Props = {
  user: User;
  state: object;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  border-radius: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;
const PushElement = styled.a`
  cursor: pointer;
`;
export default function UserItem(props: Props) {
  const { user, state, handleChange } = props;
  const onClickHandler = (e: MouseEvent<HTMLHeadingElement>) => {
    const url = `http://localhost:3000/users/${user.id}`;
    Router.push(url);
  };
  return (
    <React.Fragment>
      <tr>
        <td>
          <Checkbox
            id={user.id.toString()}
            isChecked={state}
            onChange={handleChange}
          ></Checkbox>
        </td>
        <td>
          <PushElement onClick={onClickHandler}>{user.email}</PushElement>
        </td>
        <td>
          <PushElement onClick={onClickHandler}>{user.nickname}</PushElement>
        </td>
        <td>
          <PushElement onClick={onClickHandler}>{user.name}</PushElement>
        </td>
        <td>
          <PushElement onClick={onClickHandler}>
            {user.isadmin ? '관리자' : user.ishost ? '호스트' : '일반'}
          </PushElement>
        </td>
      </tr>
    </React.Fragment>
  );
}
