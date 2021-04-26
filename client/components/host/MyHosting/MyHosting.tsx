import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Applicant, Host, User } from '../../../interfaces';
import Button from '@material-ui/core/Button';
import ReuseButton from '../../reuse/Button';
import HostInfoChange from './HostInfoChange';
import IconButton from '@material-ui/core/IconButton';
import { hostname } from 'node:os';
import HostingApplicantItem from './HostingApplicantItem';
interface Props {
	host: Host;
	applyList: Applicant[];
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
		margin: 2em;
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

const CssIconButton = styled(IconButton)`
	&.MuiIconButton-root {
		padding: 0;
	}
`;
export default function MyHosting(props: Props): ReactElement {
	const [dialogueOpen, setDialogueOpen] = useState(false);
	const [nameState, setNameState] = useState(false);
	let applicants = [];
	const getApplicants = () => {
		props.applyList.map(value => {
			if (props.host.id === 20) applicants.push(value);
		});
	};

	const handleDialogueOpen = () => {
		setDialogueOpen(true);
	};
	const handleDialogueClose = () => {
		setDialogueOpen(false);
	};
	// const nameSortHandler = () => {
	// 	setNameState(!nameState);
	// 	if (nameState) {
	// 		host.sort(function (a: any, b: any) {
	// 			return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
	// 		});
	// 	} else {
	// 		host.sort(function (a: any, b: any) {
	// 			return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
	// 		});
	// 	}
	// };
	console.log(props.applyList);
	return (
		<div>
			{/* 호스팅 신청자 목록 */}
			<Label id='table'>호스팅 신청자 목록</Label>
			<UserTable>
				<thead>
					<tr>
						<th>닉네임</th>
						<th>날짜</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{props.applyList.map(value => (
						<HostingApplicantItem applicant={value} />
					))}
				</tbody>
			</UserTable>

			{/* 이전 호스팅 목록 */}
			<Label id='table'>이전 호스팅 목록</Label>

			{/* 호스트 정보 변경 */}
			<Label>호스트 정보 변경</Label>
			<ButtonLabel onClick={handleDialogueOpen} color='primary'>
				정보 변경
			</ButtonLabel>
			<HostInfoChangeDialogue
				disableBackdropClick
				disableEscapeKeyDown
				open={dialogueOpen}
				onClose={handleDialogueClose}
			>
				<HostInfoChange host={props.host} />
				<DialogActions>
					<Button onClick={handleDialogueClose} color='secondary'>
						나가기
					</Button>
				</DialogActions>
			</HostInfoChangeDialogue>
		</div>
	);
}