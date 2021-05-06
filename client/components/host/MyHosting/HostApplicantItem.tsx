import { Application } from '../../../interfaces';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import axios from 'axios';
import SERVER from '../../../utils/url';
import Router from 'next/router';
import { UserStateContext } from '../../../context/user';

type Props = {
	applicant: Application;
};
const ButtonLabel = styled(Button)`
	&.MuiButton-root {
		color: #5197d5;
		margin: 0;
		font-size: 0.9em;
		&:hover {
			color: rgb(33, 33, 33);
		}
	}
	&.MuiButton-textSecondary {
		color: #e74c3c;
	}
`;
const ButtonTd = styled.td`
	max-width: 10em;
	min-width: 10em;
`;

export default function HostApplicantItem(props: Props) {
	const { applicant } = props;
	const [list, setList] = useState(applicant);
	const currentUser = useContext(UserStateContext);

	useEffect(() => {
		setList(applicant);
	}, [applicant]);

	const onApprovalHandler = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${SERVER}/api/host/application/approve`, {
				id: list.user.id,
				hostUserId: currentUser.id,
			});
			if (res.data.success) {
				const createRoomRes = await axios.post(
					`${SERVER}/api/message/room/create`,
					{
						hostUserId: currentUser.id,
						userId: list.user.id,
					},
				);
				if (createRoomRes.data.success) {
					alert('승인 처리되었습니다. 채팅을 통해 약속을 잡으세요');
					Router.push('/hosts/myhosting');
				}
			}
		} catch (err) {
			return console.log(err);
		}
	};
	const onDenialHandler = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${SERVER}/api/host/application/deny`, {
				id: list.user.id,
				hostUserId: currentUser.id,
			});
			if (res.data.success) {
				alert('거부 처리되었습니다.');
				Router.push('/hosts/myhosting');
			}
		} catch (err) {
			return console.log(err);
		}
	};
	return (
		<React.Fragment>
			<tr>
				<td>{applicant?.user.nickname || '닉네임'}</td>
				<td>{applicant?.date || '2021-01-01'}</td>
				<ButtonTd>
					<ButtonLabel onClick={onApprovalHandler}>승인</ButtonLabel>
					<ButtonLabel onClick={onDenialHandler} color='secondary'>
						거부
					</ButtonLabel>
				</ButtonTd>
			</tr>
		</React.Fragment>
	);
}
