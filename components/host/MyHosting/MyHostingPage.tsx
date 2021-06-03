import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import React, { ReactElement, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Application, Host, PreviousApplication } from '../../../interfaces';
import Button from '@material-ui/core/Button';
import HostInfoChange from './HostInfoChange';
import HostApplicantItem from './HostApplicantItem';
import CloseIcon from '@material-ui/icons/Close';
import HostPreviousApplicantItem from './HostPreviousApplicantItem';
import HostMatchedApplicantItem from './HostMatchedApplicantItem';
import Toast from '../../reuse/Toast';
import { useToast } from '../../../client/hooks/useToast';
interface Props {
	host: Host;
	waitingApplicant: Application[];
	previousApplicant: PreviousApplication[];
	matchedApplicant: Application[];
}
const Layout = styled.div`
	padding-top: 2em;
	& > div {
		margin-bottom: 2rem;
	}
	& .more {
		padding: 0.25rem;
		font-size: 0.9em;
		text-align: right;
		cursor: pointer;
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
		min-width: 80%;
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
	/* margin: 0 auto 3em auto; */
	text-align: center;
	border-collapse: collapse;
	font-size: 1em;
	& th {
		padding: 0.25em 0;
	}
	& thead {
		border-bottom: 1px solid #aaa;
	}
	& td {
		padding: 1rem 0.5rem;
		border-bottom: 1px solid #aaa;
	}
	& .Rating {
		font-size: 0.8em;
	}
`;
const CloseButtonDiv = styled(DialogActions)`
	&.MuiDialogActions-root {
		padding: 0.5em 0 0 0;
		margin: 0;
	}
`;

const NoItem = ({
	children,
	colspan,
}: {
	children: ReactNode;
	colspan: number;
}) => (
	<tr>
		<td colSpan={colspan} style={{ fontWeight: 500 }}>
			{children}
		</td>
	</tr>
);

export default function MyHostingPage(props: Props): ReactElement {
	const { waitingApplicant, host, previousApplicant, matchedApplicant } = props;

	const [dialogueOpen, setDialogueOpen] = useState(false);
	const toast = useToast(false);
	const handleDialogueOpen = () => {
		setDialogueOpen(true);
	};
	const handleDialogueClose = () => {
		setDialogueOpen(false);
	};

	const [moreMatched, setMoreMatched] = useState(false);
	const [moreWating, setMoreWating] = useState(false);
	const [morePrevious, setMorePrevious] = useState(false);

	const onChangeMoreMatched = () => {
		setMoreMatched(!moreMatched);
	};
	const onChangeMoreWating = () => {
		setMoreWating(!moreWating);
	};
	const onChangeMorePrevious = () => {
		setMorePrevious(!morePrevious);
	};
	return (
		<Layout>
			<div>
				<h3>현재 호스팅 목록</h3>
				<UserTable>
					<thead>
						<tr>
							<th style={{ width: '35%' }}>닉네임</th>
							<th style={{ width: '35%' }}>날짜</th>
							<th style={{ width: '30%' }}>동행관리</th>
						</tr>
					</thead>
					<tbody>
						{matchedApplicant.length ? (
							(moreMatched
								? matchedApplicant
								: matchedApplicant.slice(0, 5)
							).map(value => (
								<HostMatchedApplicantItem
									applicant={value}
									toast={toast.handleOpen}
								/>
							))
						) : (
							<NoItem colspan={3}>진행중인 호스팅이 없습니다.</NoItem>
						)}
					</tbody>
				</UserTable>
				{matchedApplicant!.length > 5 ? (
					<div className='more' onClick={onChangeMoreMatched}>
						<a className='more'>더보기</a>
					</div>
				) : (
					''
				)}
			</div>
			<div>
				<h3>호스팅 신청자 목록</h3>
				<UserTable>
					<thead>
						<tr>
							<th style={{ width: '35%' }}>닉네임</th>
							<th style={{ width: '35%' }}>날짜</th>
							<th style={{ width: '30%' }}>승인여부</th>
						</tr>
					</thead>
					<tbody>
						{waitingApplicant.length ? (
							(moreWating
								? waitingApplicant
								: waitingApplicant.slice(0, 5)
							).map(value => (
								<HostApplicantItem applicant={value} toast={toast.handleOpen} />
							))
						) : (
							<NoItem colspan={3}>호스트 신청자가 없습니다.</NoItem>
						)}
					</tbody>
				</UserTable>
				{waitingApplicant!.length > 5 ? (
					<div className='more' onClick={onChangeMoreWating}>
						<a className='more'>더보기</a>
					</div>
				) : (
					''
				)}
			</div>
			<div>
				<h3>이전 호스팅 목록</h3>
				<UserTable>
					<thead>
						<tr>
							<th style={{ width: '15%' }}>날짜</th>
							<th style={{ width: '40%' }}>장소</th>
							<th style={{ width: '20%' }}>닉네임</th>
							<th style={{ width: '25%' }}>평점</th>
						</tr>
					</thead>
					<tbody>
						{previousApplicant.length ? (
							(morePrevious
								? previousApplicant
								: previousApplicant.slice(0, 5)
							).map(value => <HostPreviousApplicantItem applicant={value} />)
						) : (
							<NoItem colspan={4}>호스팅 내역이 없습니다.</NoItem>
						)}
					</tbody>
				</UserTable>

				{previousApplicant!.length > 5 ? (
					<div className='more' onClick={onChangeMorePrevious}>
						<a className='more'>더보기</a>
					</div>
				) : (
					''
				)}
			</div>

			<div>
				<h3>호스트 정보 변경</h3>
				<ButtonLabel onClick={handleDialogueOpen} color='primary'>
					정보 변경
				</ButtonLabel>
				{/* 다이얼로그 창 */}
				<HostInfoChangeDialogue
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
			<Toast {...toast}>{toast.message}</Toast>
		</Layout>
	);
}
