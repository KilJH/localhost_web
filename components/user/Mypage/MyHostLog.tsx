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
							??????
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
		// ????????? ?????? State
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
							<Button onClick={modal.handleOpen}>????????????</Button>
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

	// ????????? ????????? ?????? ?????????
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
		const yes = confirm('?????? ?????????????????????????');
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

					toast.handleOpen('success', '????????? ?????????????????????.');
				}
			});
		}
	}, []);

	// ?????? on/off??? ???????????? ??????
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
						<h3>?????? ???????????? ?????????({presentApp.length})</h3>
					</header>

					<Table>
						<thead>
							<tr>
								<th>??????</th>
								<th>?????????</th>
								<th>??????</th>
								<th>??????</th>
							</tr>
						</thead>
						<tbody>
							{/* ????????? ????????????, */}
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
								<NoItem>?????? ??????????????? ????????????.</NoItem>
							)}
						</tbody>
					</Table>
					{presentApp!.length > 5 && (
						<div className='more' onClick={onChangeMorePresent}>
							<a className='more'>?????????</a>
						</div>
					)}
				</section>
				<section>
					<header>
						<h3>????????? ?????????({preApplications.length})</h3>
					</header>

					<Table>
						<thead>
							<tr>
								<th style={{ width: '25%' }}>??????</th>
								<th>?????????</th>
								<th style={{ width: '30%' }}>??????</th>
								<th style={{ width: '25%' }}>??????</th>
							</tr>
						</thead>
						<tbody>
							{/* ????????? ????????????, */}
							{preApplications.length ? (
								(morePast
									? preApplications!
									: preApplications!.slice(0, 5)
								).map(app => <HistoryItem history={app} key={app.id} />)
							) : (
								<NoItem>?????? ??????????????? ????????????.</NoItem>
							)}
						</tbody>
					</Table>
					{preApplications!.length > 5 && (
						<div className='more' onClick={onChangeMorePast}>
							<a className='more'>?????????</a>
						</div>
					)}
				</section>

				<section>
					<header>
						<h3>????????? ?????????({canceledApp.length})</h3>
					</header>

					<Table>
						<thead>
							<tr>
								<th>??????</th>
								<th>?????????</th>
								<th style={{ width: '16em' }}>??????</th>
							</tr>
						</thead>
						<tbody>
							{/* ????????? ????????????, */}
							{canceledApp.length ? (
								(moreCancel ? canceledApp! : canceledApp!.slice(0, 5)).map(
									app => (
										<CanceledApplicationItem application={app} key={app.id} />
									),
								)
							) : (
								<NoItem>?????? ??????????????? ????????????.</NoItem>
							)}
						</tbody>
					</Table>
					{canceledApp!.length > 5 && (
						<div className='more' onClick={onChangeMoreCancel}>
							<a className='more'>?????????</a>
						</div>
					)}
				</section>
			</Container>
			<Toast {...toast}>{toast.message}</Toast>
		</MypageLayout>
	);
};

export default MyHostLog;
