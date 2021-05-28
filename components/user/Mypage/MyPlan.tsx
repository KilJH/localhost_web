import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Plan } from '../../../interfaces';
import MypageLayout from './MypageHeader';

interface Props {
	wishPlans: Plan[];
	myPlans: Plan[];
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
		/* width: 20%; */
		overflow: hidden;
	}
	& td {
		padding: 1em 0.5em;
	}
	& .plan_title {
		width: 40%;
	}
`;
const NoItem = ({ children, col }: { children: ReactNode; col: number }) => (
	<tr>
		<td colSpan={col} style={{ textAlign: 'center' }}>
			{children}
		</td>
	</tr>
);

const MyPlan = (props: Props) => {
	const { wishPlans, myPlans } = props;

	// 단순 on/off를 활용하기 위함
	const [moreWish, setMoreWish] = useState(false);
	const [moreMine, setMoreMine] = useState(false);

	const onChangeMoreWish = () => {
		setMoreWish(!moreWish);
	};
	const onChangeMoreMine = () => {
		setMoreMine(!moreMine);
	};

	return (
		<MypageLayout tabNum={3}>
			<Container>
				<section>
					<header>
						<h3>내가 담은 플랜({wishPlans.length})</h3>
					</header>

					<Table>
						<thead>
							<tr>
								<th className='plan_title'>제목</th>
								<th>작성자</th>
								<th>삭제</th>
							</tr>
						</thead>
						<tbody>
							{(moreWish ? wishPlans : wishPlans.slice(0, 5)).map(plan => (
								<tr>
									<td>
										<Link href='/plans/[id]' as={`/plans/${plan.id}`}>
											<a>{plan.title}</a>
										</Link>
									</td>
									<td>{plan.author?.nickname}</td>
									<td>버튼</td>
								</tr>
							)) || <NoItem col={3}>여행플랜이 없습니다.</NoItem>}
						</tbody>
					</Table>
					{wishPlans.length > 5 ? (
						<div className='more' onClick={onChangeMoreWish}>
							<a className='more'>더보기</a>
						</div>
					) : (
						''
					)}
				</section>
				<section>
					<header>
						<h3>내가 작성한 플랜({myPlans.length})</h3>
					</header>

					<Table>
						<thead>
							<tr>
								<th className='plan_title'>제목</th>
								<th>조회수</th>
								<th>좋아요</th>
								<th>수정</th>
								<th>삭제</th>
							</tr>
						</thead>

						<tbody>
							{/* 없으면 없습니다, */}
							{(moreMine ? myPlans : myPlans.slice(0, 5)).map(plan => (
								<tr>
									<td>
										<Link href='/plans/[id]' as={`/plans/${plan.id}`}>
											<a>{plan.title}</a>
										</Link>
									</td>
									<td>{plan.hit}</td>
									<td>{0}</td>
									<td>수정버튼</td>
									<td>삭제버튼</td>
								</tr>
							)) || <NoItem col={5}>여행플랜이 없습니다.</NoItem>}
						</tbody>
					</Table>
					{myPlans.length > 5 ? (
						<div className='more' onClick={onChangeMoreMine}>
							<a className='more'>더보기</a>
						</div>
					) : (
						''
					)}
				</section>
			</Container>
		</MypageLayout>
	);
};

export default MyPlan;
