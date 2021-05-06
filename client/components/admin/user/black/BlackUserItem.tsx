import { BlackUser } from '../../../../interfaces';
import React, { useState } from 'react';
import styled from 'styled-components';
import UserDetail from '../UserDetail';

type Props = {
	black: BlackUser;
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
export default function blackUserItem(props: Props) {
	const { black, state, handleChange } = props;
	const [detailState, setDetailState] = useState(false);
	const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
		setDetailState(!detailState);
	};
	return (
		<React.Fragment>
			<tr>
				<td
					style={
						!detailState
							? { borderBottom: 0 }
							: { borderBottom: '1px solid black' }
					}
				>
					<Checkbox
						id={black.user.id.toString()}
						checked={state}
						onChange={handleChange}
					></Checkbox>
				</td>
				<td>
					<PushElement onClick={onClickHandler}>
						{black.user.nickname}
					</PushElement>
				</td>
				<td>
					<PushElement onClick={onClickHandler}>{black.user.name}</PushElement>
				</td>
				<td>
					<PushElement onClick={onClickHandler}>{black.reason}</PushElement>
				</td>
			</tr>
			<tr>
				<td style={{ padding: 0 }} colSpan={4}>
					<UserDetail user={black.user} visibility={detailState} />
				</td>
			</tr>
		</React.Fragment>
	);
}
