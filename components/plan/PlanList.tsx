import React from 'react';
import Link from 'next/link';
import PlanItem from './PlanItem';
import { Plan } from '../../interfaces/index';
import styled from 'styled-components';
import Button from '../reuse/Button';
import Pagination from '../main/Pagination';
import Search from '../search/Search';
import { ParsedUrlQuery } from 'node:querystring';

interface Props {
	plans: Array<Plan>;
	lastIdx: number;
	page: number;
	query: ParsedUrlQuery;
}

const PlanListContainer = styled.section`
	margin: 2rem 0;
	& > * {
		margin: 1rem 0;
	}
`;

const PlanList = (props: Props) => {
	const { plans, lastIdx, page, query } = props;

	// 브라우저 상 주소를 위한 url
	const url = query.item
		? `/plans/?type=${query.type}&item=${query.item}&`
		: `/plans/?`;

	const onPageClick = async idx => {
		location.href = query.item
			? `/plans?type=${query.type}&item=${query.item}&page=${idx}`
			: `/plans?page=${idx}`;
	};

	const searchProps = {
		options: ['title', 'description', 'both'],
		label: ['제목', '내용', '제목/내용'],
		onSubmit: (e, type, input) => {
			e.preventDefault();

			location.href = `/plans?type=${type}&item=${input}`;
		},
	};

	return (
		<PlanListContainer>
			<Search {...searchProps} />
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
				<a>
					<Button>플랜작성</Button>
				</a>
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
