import React, { useState } from 'react';
import Search from '../../search/Search';
import { Plan } from '../../../interfaces';
import axios from 'axios';
import SERVER from '../../../utils/url';
import PlanList from './PlanList';

type Props = {
	items: Plan[];
};

export default function PlanPage(props: Props) {
	const { items } = props;
	const [foundItems, setFoundItems] = useState(items);

	const onSubmit = async (event: React.FormEvent, type, item) => {
		event.preventDefault();
		const res = await axios.post(`${SERVER}/api/plan/search`, {
			type: type,
			item: item,
		});
		setFoundItems(res.data.list);
	};

	return (
		<div>
			<Search
				options={['title', 'nickname', 'createTime']}
				label={['제목', '플래너', '등록일자']}
				onSubmit={onSubmit}
				selectLabel='검색할 값'
				marginBottom='2em'
			/>
			<PlanList items={foundItems.length !== 0 ? foundItems : []} />
		</div>
	);
}
