import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Applicant, Host } from '../../../interfaces';
import Button from '@material-ui/core/Button';
import HostInfoChange from './HostInfoChange';
import IconButton from '@material-ui/core/IconButton';
import HostApplicantItem from './HostApplicantItem';
import CloseIcon from '@material-ui/icons/Close';
import HostPreviousApplicantItem from './HostPreviousApplicantItem';
import { PreviousApplicant } from './../../../interfaces/index';

interface Props {
	host: Host;
	applyList: Applicant[];
	userId: number;
	previousApplicant: PreviousApplicant[];
}
const Label = styled.p`
	margin: 2em 0 1em 0;
	font-size: 0.95em;
	font-weight: bold;
	&#table {
		margin-bottom: 0.25em;
	}
`;

const ButtonLabel = styled(Button)`
	&.MuiButton-root {
		color: #5197d5;
		margin: 0 1em 0 0;
		&:hover {
			color: rgb(33, 33, 33);
		}
	}
`;
const HostInfoChangeDialogue = styled(Dialog)`
	& .MuiDialog-paperWidthSm {
		min-width: 40em;
	}
	& > div > div > div {
		margin: 0 2em;
		&.HostInfoChange__ComponentDiv-sc-4jyjzj-0 {
			margin-bottom: 0;
		}
		&.MuiDialogActions-root {
			margin-top: 0;
		}
	}
	-ms-overflow-style: none;
`;

const UserTable = styled.table`
	width: 100%;
	min-width: 32em;
	margin: 0 auto;
	text-align: center;
	border-collapse: collapse;
	font-size: 0.9em;
	& th {
		padding: 0.25em 0;
	}
	& thead {
		border-top: 1px solid gray;
		border-bottom: 1px solid gray;
	}
	& td {
		border-bottom: 1px solid gray;
	}
	& tbody > tr:nth-child(odd) {
		background-color: rgba(81, 151, 213, 0.2);
	}
`;
const CloseButtonDiv = styled(DialogActions)`
	&.MuiDialogActions-root {
		padding: 0.5em 0 0 0;
		margin: 0;
	}
`;
export default function MyHostingPage(props: Props): ReactElement {
	const { applyList, host, userId, previousApplicant } = props;
	const [dialogueOpen, setDialogueOpen] = useState(false);

	const handleDialogueOpen = () => {
		setDialogueOpen(true);
	};
	const handleDialogueClose = () => {
		setDialogueOpen(false);
	};
	return (
		<div>
			{/* 호스팅 신청자 목록 */}
			<Label id='table'>호스팅 신청자 목록</Label>
			<UserTable>
				<thead>
					<tr>
						<th>닉네임</th>
						<th>날짜</th>
						<th>승인여부</th>
					</tr>
				</thead>
				<tbody>
					{applyList.map(value => (
						<HostApplicantItem applicant={value} userId={userId} />
					))}
				</tbody>
			</UserTable>

			{/* 이전 호스팅 목록 */}
			<Label id='table'>이전 호스팅 목록</Label>
			<UserTable>
				<thead>
					<tr>
						<th>날짜</th>
						<th>장소</th>
						<th>닉네임</th>
						<th>평점</th>
					</tr>
				</thead>
				{/* <tbody>
					{previousApplicant.map(value => (
						<HostPreviousApplicantItem applicant={value} />
					))}
				</tbody> */}
				<tbody>
					<HostPreviousApplicantItem />
					<HostPreviousApplicantItem />
				</tbody>
			</UserTable>
			{/* 호스트 정보 변경 */}
			<Label>호스트 정보 변경</Label>
			<ButtonLabel onClick={handleDialogueOpen} color='primary'>
				정보 변경
			</ButtonLabel>
			{/* 다이알로그 창 */}
			<HostInfoChangeDialogue
				disableBackdropClick
				disableEscapeKeyDown
				open={dialogueOpen}
				onClose={handleDialogueClose}
			>
				<CloseButtonDiv>
					<Button onClick={handleDialogueClose}>
						<CloseIcon />
					</Button>
				</CloseButtonDiv>
				<HostInfoChange host={host} />
			</HostInfoChangeDialogue>
		</div>
	);
}
