import { Host } from '../../../../interfaces';
import React, { useState } from 'react';
import styled from 'styled-components';
import HostApprovalDetail from './HostApprovalDetail';

type Props = {
	user: Host;
	state: object;
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
						id={user.id.toString()}
						isChecked={state}
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
					<HostApprovalDetail user={user} visibility={detailState} />
				</td>
			</tr>
		</React.Fragment>
	);
}
