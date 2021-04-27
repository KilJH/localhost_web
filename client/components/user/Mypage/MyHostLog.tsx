import React, { ReactNode } from 'react';
import styled from 'styled-components';
import MypageLayout from './MypageHeader';

interface Props {}

const Container = styled.div`
	& > section {
		border-bottom: 1px solid #aaa;
		& > header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			& > a {
				font-size: 0.8em;
			}
		}
	}
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-bottom: 2rem;
	& th,
	& td {
		border-bottom: 1px solid #aaa;
	}
	& td {
		padding: 1em 0.5em;
	}
`;

const IngItem = () => {};

const NoItem = ({ children }: { children: ReactNode }) => (
	<tr>
		<td colSpan={4} style={{ textAlign: 'center' }}>
			{children}
		</td>
	</tr>
);

const MyHostLog = (props: Props) => {
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
							<NoItem>현재 신청내역이 없습니다.</NoItem>
						</tbody>
					</Table>
				</section>
				<section>
					<header>
						<h3>지나온 호스트</h3>
						<a>더보기</a>
					</header>
					{/* 5개만큼 잘라서 mapping */}
				</section>
			</Container>
		</MypageLayout>
	);
};

export default MyHostLog;
