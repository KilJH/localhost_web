import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { Notice } from '../../../interfaces';

type Props = {
  item: Notice;
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
export default function NoticeNewItem(props: Props) {
  const { item, state, handleChange } = props;
  const onClickHandler = (e: MouseEvent<HTMLHeadingElement>) => {
    // const url = `http://localhost:3000/users/${user.id}`;
    // Router.push(url);
  };
  return (
    <React.Fragment>
      <tr>
        <td>
          <Checkbox
            id={item.id.toString()}
            isChecked={state}
            onChange={handleChange}
          ></Checkbox>
        </td>
        <td>
          <PushElement onClick={onClickHandler}>{item.id}</PushElement>
        </td>
        <td>
          <PushElement onClick={onClickHandler}>{item.title}</PushElement>
        </td>
        <td>
          <PushElement onClick={onClickHandler}>{item.createTime}</PushElement>
        </td>
      </tr>
    </React.Fragment>
  );
}
