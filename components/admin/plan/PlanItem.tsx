import { Plan } from '../../../interfaces';
import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

type Props = {
	item: Plan;
	state: boolean;
	handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = styled.input.attrs({
	type: 'checkbox',
})`
	border-radius: 1rem;
	margin-left: 1rem;
	margin-right: 1rem;
`;
const PushElement = styled.a`
	cursor: pointer;
`;
export default function PlanItem(props: Props) {
	const { item, state, handleChange } = props;
	const [detailState, setDetailState] = useState(false);
	const onClickHandler = () => {
		setDetailState(!detailState);
	};
	return (
		<React.Fragment>
			<Link href='/admin/plan/[id]' as={`/admin/plan/${item.id}`}>
				<tr>
					<td>
						<Checkbox
							id={item!.id!.toString()}
							checked={state}
							onChange={handleChange}
						></Checkbox>
					</td>

					<td>
						<PushElement onClick={onClickHandler}>{item.title}</PushElement>
					</td>
					<td>
						<PushElement onClick={onClickHandler}>
							{item!.author!.nickname}
						</PushElement>
					</td>
					<td>
						<PushElement onClick={onClickHandler}>
							{item!.createTime!.substring(0, 10)}
						</PushElement>
					</td>
				</tr>
			</Link>
		</React.Fragment>
	);
}
