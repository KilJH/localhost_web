import { Host } from '../../../interfaces';
import React, { useState } from 'react';
import styled from 'styled-components';
import HostDetail from './HostDetail';

type Props = {
	host: Host;
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
	const { host, state, handleChange } = props;
	const [detailState, setDetailState] = useState(false);
	const onClickHandler = () => {
		setDetailState(!detailState);
	};
	return (
		<React.Fragment>
			<tr>
				<td>
					<Checkbox
						id={host!.id!.toString()}
						checked={state}
						onChange={handleChange}
					></Checkbox>
				</td>
				<td>
					<PushElement onClick={onClickHandler}>{host.email}</PushElement>
				</td>
				<td>
					<PushElement onClick={onClickHandler}>{host.nickname}</PushElement>
				</td>
				<td>
					<PushElement onClick={onClickHandler}>{host.name}</PushElement>
				</td>
			</tr>
			<tr>
				<td style={{ padding: 0 }} colSpan={4}>
					<HostDetail host={host} visibility={detailState} />
				</td>
			</tr>
		</React.Fragment>
	);
}
