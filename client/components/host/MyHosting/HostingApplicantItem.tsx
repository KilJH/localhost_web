import { Applicant, Host, User } from '../../../interfaces';
import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
	applicant?: Applicant;
};

// const Checkbox = styled.input.attrs({
// 	type: 'checkbox',
// })`
// 	border-radius: 1rem;
// 	margin-left: 1rem;
// 	margin-right: 1rem;
// `;
const PushElement = styled.a`
	cursor: pointer;
`;
export default function UserItem(props: Props) {
	const [detailState, setDetailState] = useState(false);
	const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
		setDetailState(!detailState);
	};
	return (
		<React.Fragment>
			<tr>
				{/* <td
					style={
						!detailState
							? { borderBottom: 0 }
							: { borderBottom: '1px solid black' }
					}
				> */}
				{/* <Checkbox
						id={user.id.toString()}
						isChecked={state}
						onChange={handleChange}
					></Checkbox> */}
				{/* </td> */}
				<td>{props.applicant?.user.name || '이름'}</td>
				<td>
					{/* <PushElement onClick={onClickHandler}>{props.applicant.nickname}</PushElement> */}

					<PushElement onClick={onClickHandler}>
						{props.applicant?.date || '2021-01-01'}
					</PushElement>
				</td>
				<td></td>
			</tr>
		</React.Fragment>
	);
}
