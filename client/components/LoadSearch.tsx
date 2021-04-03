import React, { useState } from 'react';
import Search from './Search';
import { User } from '../interfaces';
import axios from 'axios';
import SERVER from '../utils/url';
import UserList from './admin/user/UserList';

type Props = {
  items: User[];
  search?: User;
  isHost?: boolean;
  isPreHost?: boolean;
};

export default function LoadSearch(props: Props) {
  const { items } = props;
  const [foundItems, setFoundItems] = useState([]);

  const onSubmit = async (event: React.FormEvent, type, item) => {
    event.preventDefault();
    const res = await axios.post(`${SERVER}/api/user/search`, {
      type: type,
      item: item,
    });
    setFoundItems(res.data.users);
  };

  return (
    <div>
      <Search
        options={['email', 'nickname', 'name']}
        label={['이메일', '닉네임', '이름']}
        onSubmit={onSubmit}
        selectLabel='검색할 값'
        marginTop='5rem'
      />
      <UserList items={foundItems.length !== 0 ? foundItems : items} />
    </div>
  );
}
