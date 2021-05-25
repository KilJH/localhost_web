import React from 'react';
import { PlanDay } from '../../interfaces';
import PlanTimeItem from './PlanTimeItem';

interface Props {
	planDay: PlanDay;
	onDelete?: (i: number) => void;
}

const PlanDayItem = (props: Props) => {
	const { planDay, onDelete } = props;
	return (
		<div>
			{planDay.planTimes?.map((time, i) => {
				return (
					<PlanTimeItem
						plan={time}
						key={i}
						onDelete={
							onDelete
								? () => {
										onDelete(i);
								  }
								: undefined
						}
					/>
				);
			})}
		</div>
	);
};

export default PlanDayItem;
