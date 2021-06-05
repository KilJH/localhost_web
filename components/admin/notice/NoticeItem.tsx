import React, { useState } from 'react';
import styled from 'styled-components';
import { useToast } from '../../../client/hooks/useToast';
import { Notice } from '../../../interfaces';
import Toast from '../../reuse/Toast';
import NoticeUpdate from './NoticeUpdate';

type Props = {
	item: Notice;
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
export default function NoticeItem(props: Props) {
	const { item, state, handleChange } = props;
	const [detailState, setDetailState] = useState(false);
	const toast = useToast(false);
	const onClickHandler = () => {
		setDetailState(!detailState);
	};
	return (
		<React.Fragment>
			<tr>
				<td>
					<Checkbox
						id={item.id.toString()}
						checked={state}
						onChange={handleChange}
					></Checkbox>
				</td>
				<td>
					<PushElement onClick={onClickHandler}>{item.id}</PushElement>
				</td>
				<td>
					<PushElement onClick={onClickHandler}>{item.title}</PushElement>
				</td>
				<td>
					<PushElement onClick={onClickHandler}>{item.createTime}</PushElement>
				</td>
			</tr>
			<tr>
				<td style={{ padding: 0 }} colSpan={4}>
					<NoticeUpdate
						item={item}
						visibility={detailState}
						setVisibility={setDetailState}
						toast={toast.handleOpen}
					/>
				</td>
			</tr>
			<Toast {...toast}>{toast.message}</Toast>
		</React.Fragment>
	);
}
