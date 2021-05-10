import React from 'react';
import { PlanDay } from '../../interfaces';
import PlanTimeItem from './PlanTimeItem';

interface Props {
	planDay: PlanDay;
}

const PlanDayItem = (props: Props) => {
	const { planDay } = props;
	return (
		<div>
			{planDay.planTimes.map(time => {
				return <PlanTimeItem plan={time} />;
			})}
		</div>
	);
};

export default PlanDayItem;
