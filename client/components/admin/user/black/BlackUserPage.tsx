import React, { useEffect, useState } from 'react';
import Search from '../../../search/Search';
import { BlackUser } from '../../../../interfaces';
import axios from 'axios';
import SERVER from '../../../../utils/url';
import BlackUserList from './BlackUserList';

type Props = {
	items: BlackUser[];
};

export default function BlackUserPage(props: Props) {
	const { items } = props;
	const [foundItems, setFoundItems] = useState(items);
	const onSubmit = async (event: React.FormEvent, type, item) => {
		event.preventDefault();
		const res = await axios.post(`${SERVER}/api/user/search`, {
			type: type,
			item: item,
		});
		setFoundItems(res.data.users);
	};

	useEffect(() => {
		setFoundItems(items);
	}, [items]);

	return (
		<div>
			<Search
				options={['email', 'nickname', 'name']}
				label={['이메일', '닉네임', '이름']}
				onSubmit={onSubmit}
				selectLabel='검색할 값'
				marginBottom='2em'
			/>
			<BlackUserList black={foundItems.length !== 0 ? foundItems : []} />
		</div>
	);
}
