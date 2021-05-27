import React, { useState } from 'react';
import Link from 'next/link';
import PlanItem from './PlanItem';
import { Plan } from '../../interfaces/index';
import styled from 'styled-components';
import Button from '../reuse/Button';
import Pagination from '../main/Pagination';
import axios from 'axios';

interface Props {
	plans: Array<Plan>;
	lastIdx: number;
	page: number;
}

const PlanListContainer = styled.section`
	margin: 2rem 0;
`;

const PlanList = (props: Props) => {
	const { lastIdx, page } = props;
	const [plans, setPlans] = useState(props.plans);
	const [query, setQuery] = useState({ type: 'title', item: '' });

	// 브라우저 상 주소를 위한 url
	const url = query.item
		? `/plans/?type=${query.type}&item=${query.item}&`
		: `/plans/?`;

	const onPageClick = async idx => {
		const apiUrl = query.item
			? `/api/plan/list?type=${query.type}&item=${query.item}&page=${idx}`
			: `/api/plan/list?page=${idx}`;
		const res = await axios.get(apiUrl);
		setPlans(res.data.plans);
	};

	return (
		<PlanListContainer>
			{plans.map(plan => (
				<Link
					as={`/plans/${plan.id}`}
					href={`/plans/id=${plan.id}`}
					key={plan.id}
				>
					<a>
						<PlanItem plan={plan} />
					</a>
				</Link>
			))}

			<Link href='/plans/write'>
				<Button>플랜작성</Button>
			</Link>

			<Pagination
				lastIdx={lastIdx}
				currentIdx={page}
				onClick={onPageClick}
				url={url}
			/>
		</PlanListContainer>
	);
};

export default PlanList;
