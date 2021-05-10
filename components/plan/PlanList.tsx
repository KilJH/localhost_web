import React from 'react';
import Link from 'next/link';
import PlanItem from './PlanItem';
import { Plan } from '../../interfaces/index';
import styled from 'styled-components';
import Button from '../reuse/Button';

interface Props {
	plans: Array<Plan>;
}

const PlanListContainer = styled.section`
	margin: 2rem 0;
`;

const PlanList = (props: Props) => {
	return (
		<PlanListContainer>
			{props.plans.map(plan => (
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
		</PlanListContainer>
	);
};

export default PlanList;
