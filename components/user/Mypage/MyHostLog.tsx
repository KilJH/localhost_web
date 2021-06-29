import { Modal, useMediaQuery } from '@material-ui/core';
import axios from 'axios';
import Link from 'next/link';
import React, {
	MouseEventHandler,
	ReactNode,
	useCallback,
	useState,
} from 'react';
import styled from 'styled-components';
import { useModal } from '../../../client/hooks/useModal';
import { useToast } from '../../../client/hooks/useToast';
import { Application, PreviousApplication } from '../../../interfaces';
import HostingStatus from '../../host/HostingStatus';
import HostReviewWrite from '../../host/HostReviewWrite';
import Button from '../../reuse/Button';
import Rating from '../../reuse/Rating';
import Toast from '../../reuse/Toast';
import MypageLayout from './MypageHeader';

interface Props {
	applications: Application[];
	preApplications: PreviousApplication[];
}

const Container = styled.div`
	& > section {
		margin-bottom: 2rem;
		& > header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	& .more {
		padding: 0.25rem;
		font-size: 0.9em;
		text-align: right;
		cursor: pointer;
	}
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	text-align: center;
	& th,
	& td {
		border-bottom: 1px solid #aaa;
		/* width: 25%; */
		overflow: hidden;
	}
	& td {
		padding: 1em 0.5em;
	}
`;

const StyledModal = styled(Modal)`
	display: flex;
	align-items: center;
	justify-content: center;

	& .modalItem {
		width: 80vw;
		max-width: 800px;
		background: rgba(255, 255, 255, 0.9);
		padding: 1rem;
		border-radius: 0.25rem;
		outline: 0;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3), -2px -2px 8px rgba(0, 0, 0, 0.3);
	}
`;

const ApplicationItem = React.memo(
	({
		application,
		onCancel,
	}: {
		application: Application;
		onCancel: MouseEventHandler<HTMLButtonElement>;
	}) => {
		return (
			<tr>
				<td>{application.date}</td>
				<td>
					<Link href='/hosts/[id]' as={`/hosts/${application.user.id}`}>
						<a>{application.user.nickname}</a>
					</Link>
				</td>
				<td>
					<HostingStatus status={application.status ?? 0} />
				</td>
				<td>
					{application.status < 2 && (
						<Button default onClick={onCancel}>
							취소
						</Button>
					)}
				</td>
			</tr>
		);
	},
);

const CanceledApplicationItem = React.memo(
	({ application }: { application: Application }) => {
		return (
			<tr>
				<td>{application.date}</td>
				<td>
					<Link href='/hosts/[id]' as={`/hosts/${application.user.id}`}>
						<a>{application.user.nickname}</a>
					</Link>
				</td>
				<td>
					<HostingStatus status={application.status ?? 0} />
				</td>
			</tr>
		);
	},
);

const HistoryItem = React.memo(
	({ history }: { history: PreviousApplication }) => {
		// 모달을 위한 State
		const modal = useModal(false);
		const isMobile = useMediaQuery('(max-width: 600px)');

		return (
			<tr>
				<td>{history.date}</td>
				<td>
					<Link href='/hosts/[id]' as={`/hosts/${history.user.id}`}>
						<a>{history.user.nickname}</a>
					</Link>
				</td>
				<td>{history.place!.formatted_address}</td>
				<td>
					{history.review!.description ? (
						<Rating
							rating={history.review!.rating as number}
							isFilled
							fontSize={isMobile ? '1.2em' : '1.6em'}
						/>
					) : (
						<>
							<Button onClick={modal.handleOpen}>리뷰작성</Button>
							<StyledModal open={modal.open} onClose={modal.handleClose}>
								<div className='modalItem'>
									<HostReviewWrite
										applicationId={history.id}
										onClose={modal.handleClose}
									/>
								</div>
							</StyledModal>
						</>
					)}
				</td>
			</tr>
		);
	},
);

const NoItem = ({ children }: { children: ReactNode }) => (
	<tr>
		<td colSpan={4} style={{ textAlign: 'center' }}>
			{children}
		</td>
	</tr>
);

const MyHostLog = (props: Props) => {
	const { applications, preApplications } = props;

	const toast = useToast(false);

	// 실시간 표시를 위한 상태화
	const [canceledApp, setCanceledApp] = useState(
		applications.filter(app => {
			const { status } = app;
			return status === 2 || status === 3 || status === 5 || status === 6;
		}),
	);

	const [presentApp, setPresentApp] = useState(
		applications.filter(app => {
			const { status } = app;
			return status < 2;
		}),
	);

	const onCancel = useCallback(app => {
		const yes = confirm('정말 취소하시겠습니까?');
		if (yes) {
			axios.post(`/api/host/application/cancel`, { id: app.id }).then(res => {
				if (res.data.success) {
					setCanceledApp(canceledApp =>
						canceledApp
							.concat({ ...app, status: 2 })
							.sort((a, b) => (a.date > b.date ? -1 : 1)),
					);
					setPresentApp(presentApp =>
						presentApp.filter(origin => origin.id !== app.id),
					);

					toast.handleOpen('success', '취소가 완료되었습니다.');
				}
			});
		}
	}, []);

	// 단순 on/off를 활용하기 위함
	const [morePresent, setMorePresent] = useState(false);
	const [morePast, setMorePast] = useState(false);
	const [moreCancel, setMoreCancel] = useState(false);

	const onChangeMorePresent = () => {
		setMorePresent(!morePresent);
	};
	const onChangeMorePast = () => {
		setMorePast(!morePast);
	};
	const onChangeMoreCancel = () => {
		setMoreCancel(!moreCancel);
	};

	return (
		<MypageLayout tabNum={2}>
			<Container>
				<section>
					<header>
						<h3>현재 진행중인 호스트({presentApp.length})</h3>
					</header>

					<Table>
						<thead>
							<tr>
								<th>날짜</th>
								<th>호스트</th>
								<th>상태</th>
								<th>취소</th>
							</tr>
						</thead>
						<tbody>
							{/* 없으면 없습니다, */}
							{presentApp.length ? (
								(morePresent ? presentApp! : presentApp!.slice(0, 5)).map(
									app => (
										<ApplicationItem
											application={app}
											onCancel={() => onCancel(app)}
											key={app.id}
										/>
									),
								)
							) : (
								<NoItem>현재 신청내역이 없습니다.</NoItem>
							)}
						</tbody>
					</Table>
					{presentApp!.length > 5 && (
						<div className='more' onClick={onChangeMorePresent}>
							<a className='more'>더보기</a>
						</div>
					)}
				</section>
				<section>
					<header>
						<h3>지나온 호스트({preApplications.length})</h3>
					</header>

					<Table>
						<thead>
							<tr>
								<th style={{ width: '25%' }}>날짜</th>
								<th>호스트</th>
								<th style={{ width: '30%' }}>장소</th>
								<th style={{ width: '25%' }}>후기</th>
							</tr>
						</thead>
						<tbody>
							{/* 없으면 없습니다, */}
							{preApplications.length ? (
								(morePast
									? preApplications!
									: preApplications!.slice(0, 5)
								).map(app => <HistoryItem history={app} key={app.id} />)
							) : (
								<NoItem>현재 신청내역이 없습니다.</NoItem>
							)}
						</tbody>
					</Table>
					{preApplications!.length > 5 && (
						<div className='more' onClick={onChangeMorePast}>
							<a className='more'>더보기</a>
						</div>
					)}
				</section>

				<section>
					<header>
						<h3>취소된 호스트({canceledApp.length})</h3>
					</header>

					<Table>
						<thead>
							<tr>
								<th>날짜</th>
								<th>호스트</th>
								<th style={{ width: '16em' }}>상태</th>
							</tr>
						</thead>
						<tbody>
							{/* 없으면 없습니다, */}
							{canceledApp.length ? (
								(moreCancel ? canceledApp! : canceledApp!.slice(0, 5)).map(
									app => (
										<CanceledApplicationItem application={app} key={app.id} />
									),
								)
							) : (
								<NoItem>현재 신청내역이 없습니다.</NoItem>
							)}
						</tbody>
					</Table>
					{canceledApp!.length > 5 && (
						<div className='more' onClick={onChangeMoreCancel}>
							<a className='more'>더보기</a>
						</div>
					)}
				</section>
			</Container>
			<Toast {...toast}>{toast.message}</Toast>
		</MypageLayout>
	);
};

export default MyHostLog;
