import React from 'react';
import { PlanDay } from '../../interfaces';
import PlanTimeItem from './PlanTimeItem';

interface Props {
	planDay: PlanDay;
	onDelete?: (time: Date) => void;
}

const PlanDayItem = (props: Props) => {
	const { planDay, onDelete } = props;

	return (
		<div>
			{planDay.planTimes?.map(time => {
				return (
					<PlanTimeItem
						plan={time}
						key={time.time.toString()}
						onDelete={onDelete}
					/>
				);
			})}
		</div>
	);
};

export default React.memo(PlanDayItem);
