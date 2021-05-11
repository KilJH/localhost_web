import React, { useState } from 'react';
import Search from '../../search/Search';
import { Host } from '../../../interfaces';
import axios from 'axios';
import HostList from './HostList';

type Props = {
	items: Host[];
};

export default function HostPage(props: Props) {
	const { items } = props;
	const [foundItems, setFoundItems] = useState(items);

	const onSubmit = async (event: React.FormEvent, type, item) => {
		event.preventDefault();
		const res = await axios.post(`/api/host/search`, {
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
				marginBottom='2em'
			/>
			<HostList items={foundItems.length !== 0 ? foundItems : []} />
		</div>
	);
}
