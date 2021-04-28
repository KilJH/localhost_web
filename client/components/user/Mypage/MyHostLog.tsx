import axios from 'axios';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Application, PreviousApplication } from '../../../interfaces';
import SERVER from '../../../utils/url';
import Button from '../../reuse/Button';
import Rating from '../../reuse/Rating';
import MypageLayout from './MypageHeader';

interface Props {
	applications?: Application[];
	preApplications?: PreviousApplication[];
}

const Container = styled.div`
	& > section {
		/* border-bottom: 1px solid #aaa; */
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
	}
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	text-align: center;
	& th,
	& td {
		border-bottom: 1px solid #aaa;
		width: 25%;
		overflow: hidden;
	}
	& td {
		padding: 1em 0.5em;
	}
`;

const StatusSpan = styled.span<{ color?: string }>`
	display: inline-block;
	padding: 0.25rem 0.5rem;
	color: ${props => props.color || 'black'};
	border: 1px solid ${props => props.color || 'black'};
	font-size: 0.8em;
`;

const Status = status => {
	switch (status) {
		case 0:
			return <StatusSpan>대기 중</StatusSpan>;
		case 1:
			return <StatusSpan color='#5197d5'>승낙</StatusSpan>;
		case 2:
			return <StatusSpan color='#e74c3c'>거절</StatusSpan>;
		case 3:
			return <StatusSpan color='#e74c3c'>취소</StatusSpan>;
		case 4:
			return <StatusSpan>완료</StatusSpan>;
		default:
			return <StatusSpan>대기 중</StatusSpan>;
	}
};

const ApplicationItem = ({ application }: { application: Application }) => {
	const onCancle = () => {
		axios
			.post(`${SERVER}/api/host/application/cancle`, { id: application.id })
			.then(res => {
				if (res.data.success) alert('취소가 완료되었습니다.');
			});
	};
	return (
		<tr>
			<td>{application.date}</td>
			<td>{application.user.nickname}</td>
			<td>{Status(application.status || 0)}</td>
			<td>
				{application.status < 2 ? (
					<Button default onClick={onCancle}>
						취소
					</Button>
				) : (
					''
				)}
			</td>
		</tr>
	);
};

const HistoryItem = ({ history }: { history: PreviousApplication }) => (
	<tr>
		<td>{history.date}</td>
		<td>{history.user.nickname}</td>
		<td>{history.place.formatted_address}</td>
		<td>
			{history.review.description ? (
				<Rating rating={history.review.rating} />
			) : (
				<Button>리뷰작성</Button>
			)}
		</td>
	</tr>
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
	return (
		<MypageLayout tabNum={2}>
			<Container>
				<section>
					<header>
						<h3>현재 진행중인 호스트</h3>
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
							{applications.length ? (
								applications.map(app => <ApplicationItem application={app} />)
							) : (
								<NoItem>현재 신청내역이 없습니다.</NoItem>
							)}
						</tbody>
					</Table>
				</section>
				<section>
					<header>
						<h3>지나온 호스트</h3>
					</header>
					{/* 5개만큼 잘라서 mapping */}

					<Table>
						<thead>
							<tr>
								<th>날짜</th>
								<th>호스트</th>
								<th>장소</th>
								<th>후기</th>
							</tr>
						</thead>
						<tbody>
							{/* 없으면 없습니다, */}
							{preApplications.length ? (
								preApplications
									.slice(0, 5)
									.map(app => <HistoryItem history={app} />)
							) : (
								<NoItem>현재 신청내역이 없습니다.</NoItem>
							)}
						</tbody>
					</Table>
					<div className='more'>
						<a className='more'>더보기</a>
					</div>
				</section>
			</Container>
		</MypageLayout>
	);
};

export default MyHostLog;
