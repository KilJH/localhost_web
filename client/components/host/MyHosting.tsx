import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Host } from '../../interfaces';
import Button from '@material-ui/core/Button';
import ReuseButton from '../reuse/Button';
import HostInfoChange from './HostInfoChange';
import IconButton from '@material-ui/core/IconButton';
interface Props {
	host: Host;
}
const Label = styled.p`
	margin: 2em 0 1em 0;
	font-size: 1em;
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
	& th {
		font-size: 1em;
	}
	& thead {
		border-bottom: 2px solid #5197d5;
	}
	& td {
		border-bottom: 1px solid black;
	}
`;

const CssTh = styled.th`
	padding-left: 1em;
`;

const CssIconButton = styled(IconButton)`
	&.MuiIconButton-root {
		padding: 0;
	}
`;
export default function MyHosting(host: Props): ReactElement {
	const [DialogueOpen, setDialogueOpen] = useState(false);
	const [nameState, setNameState] = useState(false);
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
	return (
		<div>
			{/* 호스팅 신청자 목록 */}
			<Label>호스팅 신청자 목록</Label>
			<UserTable>
				<thead>
					<tr>
						<CssTh>닉네임</CssTh>
						<CssTh>날짜</CssTh>
						<CssTh></CssTh>
					</tr>
				</thead>
				<tbody>
					{/* {sortedHosts?.map(host => (
						<HostListItem host={host} key={host.id} />
					))} */}
				</tbody>
			</UserTable>

			{/* 이전 호스팅 목록 */}
			<Label>이전 호스팅 목록</Label>

			{/* 호스트 정보 변경 */}
			<Label>호스트 정보 변경</Label>
			<ButtonLabel onClick={handleDialogueOpen} color='primary'>
				정보 변경
			</ButtonLabel>
			<HostInfoChangeDialogue
				disableBackdropClick
				disableEscapeKeyDown
				open={DialogueOpen}
				onClose={handleDialogueClose}
			>
				<HostInfoChange {...host} />
				<DialogActions>
					<Button onClick={handleDialogueClose} color='secondary'>
						나가기
					</Button>
				</DialogActions>
			</HostInfoChangeDialogue>
		</div>
	);
}
