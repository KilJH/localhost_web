import { Applicant} from '../../../interfaces';
import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import axios from 'axios';
import SERVER from '../../../utils/url';
import Router from 'next/router';

type Props = {
	applicant: Applicant;
	userId: number;
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
		color: #f50057;
	}
`;
const ButtonTd = styled.td`
	max-width: 10em;
	min-width: 10em;
`;
export default function HostApplicantItem(props: Props) {
	const { applicant, userId } = props;
	const onApprovalHandler = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${SERVER}/api/host/approveHosting`, {
				id: applicant.user.id,
				hostUserId: userId,
			});
			if (res.data.success) {
				alert('승인 처리되었습니다.');
				Router.push('http://localhost:3000/hosts/myhosting');
			}
		} catch (err) {
			return console.log(err);
		}
	};
	const onDenialHandler = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${SERVER}/api/host/denyHosting`, {
				id: applicant.user.id,
				hostUserId: userId,
			});
			if (res.data.success) {
				alert('거부 처리되었습니다.');
				Router.push('http://localhost:3000/hosts/myhosting');
			}
		} catch (err) {
			return console.log(err);
		}
	};
	return (
		<React.Fragment>
			<tr>
				<td>{applicant?.user.name || '이름'}</td>
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
