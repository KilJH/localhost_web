import { Application } from '../../../interfaces';
import React from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import axios from 'axios';
import Router from 'next/router';

type Props = {
	applicant: Application;
	toast: Function;
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
export default function HostMatchedApplicantItem(props: Props) {
	const { applicant, toast } = props;
	const date = new Date();
	const nowDate =
		date.getFullYear() +
		'-' +
		(date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
		'-' +
		(date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

	const onApprovalHandler = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (!applicant.user.address || applicant.date > nowDate) {
			toast('error', '비정상적인 접근입니다.');
			return;
		}

		const res = await axios.post(`/api/host/application/complete`, {
			id: applicant.id,
		});
		if (res.data.success) {
			toast('success', '동행이 완료되었습니다.');
			Router.push('/hosts/myhosting');
		} else {
			toast('error', '동행 완료를 실패했습니다.');
		}
	};
	const onCancelHandler = async (e: React.MouseEvent) => {
		e.preventDefault();
		const res = await axios.post(`/api/host/application/cancel`, {
			id: applicant.id,
		});
		if (res.data.success) {
			toast('info', '동행이 취소되었습니다.');
			Router.push('/hosts/myhosting');
		} else {
			toast('error', '동행 취소를 실패했습니다.');
		}
	};

	return (
		<React.Fragment>
			<tr>
				<td>{applicant?.user.nickname || '닉네임'}</td>
				<td>{applicant?.date || '2021-01-01'}</td>
				<td>
					{applicant.user.address && applicant.date <= nowDate ? (
						<ButtonLabel onClick={onApprovalHandler}>동행완료</ButtonLabel>
					) : (
						<ButtonLabel onClick={onCancelHandler} color='secondary'>
							동행취소
						</ButtonLabel>
					)}
				</td>
			</tr>
		</React.Fragment>
	);
}
