import { User } from '../../interfaces';
import React from 'react';
import styled from 'styled-components';

type Props = {
  user: User;
  state: object;
  handleChange: React.ChangeEvent<HTMLInputElement>;
};

const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  border-radius: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export default function UserItem(props: Props) {
  const { user, state, handleChange } = props;
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
        <td>{user.email}</td>
        <td>{user.nickname}</td>
        <td>{user.name}</td>
        <td>{user.isadmin ? '관리자' : user.ishost ? '호스트' : '일반'}</td>
      </tr>
    </React.Fragment>
  );
}
