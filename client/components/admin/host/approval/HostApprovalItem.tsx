import { Host } from '../../../../interfaces';
import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  user: Host;
  state: object;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  setUserState: Function;
  setDetailState: Function;
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
  const { user, state, handleChange, setUserState, setDetailState } = props;
  const [trueState, setTrueState] = useState(true);
  const onClickHandler = (e: MouseEvent<HTMLHeadingElement>) => {
    setUserState(user);
    setDetailState(trueState);
    setTrueState(!trueState);
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
      </tr>
    </React.Fragment>
  );
}
