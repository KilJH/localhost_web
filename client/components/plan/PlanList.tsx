import React from 'react';
import Link from 'next/link';
import PlanItem from './PlanItem';
import { Fade } from '@material-ui/core';
import { Plan } from '../../interfaces/index';

interface Props {
	plans: Array<Plan>;
}

const PlanList = (props: Props) => {
	return (
		<Fade in timeout={300}>
			<div>
				{props.plans.map((plan) => (
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
			</div>
		</Fade>
	);
};

export default PlanList;
