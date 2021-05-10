import { Host, User } from '../../../interfaces';
import React, { useState } from 'react';
import styled from 'styled-components';
import UserDetail from './UserDetail';

type Props = {
	user: User | Host;
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
export default function UserItem(props: Props) {
	const { user, state, handleChange } = props;
	const [detailState, setDetailState] = useState(false);
	const onClickHandler = () => {
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
						id={user!.id!.toString()}
						checked={state}
						onChange={handleChange}
					></Checkbox>
				</td>
				<td>
					<PushElement onClick={onClickHandler}>{user.email}</PushElement>
				</td>
				<td>
					<PushElement onClick={onClickHandler}>{user.nickname}</PushElement>
				</td>
				<td>
					<PushElement onClick={onClickHandler}>{user.name}</PushElement>
				</td>
			</tr>
			<tr>
				<td style={{ padding: 0 }} colSpan={4}>
					<UserDetail user={user as User} visibility={detailState} />
				</td>
			</tr>
		</React.Fragment>
	);
}
