import axios from 'axios';
import Link from 'next/link';
import React, { ReactNode, useContext, useState } from 'react';
import styled from 'styled-components';
import { useToast } from '../../../client/hooks/useToast';
import { UserStateContext } from '../../../context/user';
import { Plan } from '../../../interfaces';
import Button from '../../reuse/Button';
import Toast from '../../reuse/Toast';
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
		width: 50%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
	const [wishPlans, setWishPlans] = useState(props.wishPlans);
	const [myPlans, setmyPlans] = useState(props.myPlans);
	const currentUser = useContext(UserStateContext);

	const toast = useToast(false);

	// 단순 on/off를 활용하기 위함
	const [moreWish, setMoreWish] = useState(false);
	const [moreMine, setMoreMine] = useState(false);

	const onChangeMoreWish = () => {
		setMoreWish(!moreWish);
	};
	const onChangeMoreMine = () => {
		setMoreMine(!moreMine);
	};

	const onDeleteWish = async id => {
		const yes = confirm('정말 삭제하시겠습니까?');
		if (yes) {
			const res = await axios.post('/api/plan/wishList/delete', {
				userId: currentUser.id,
				planId: id,
			});

			if (res.data.success) {
				toast.handleOpen('success', '내가 담은 플랜에서 제거했습니다.');
				const wishRes = await axios.post(`/api/plan/wishlist`, {
					userId: currentUser.id,
				});
				setWishPlans(wishRes.data.list);
			} else {
				toast.handleOpen('error', '삭제에 실패했습니다.');
			}
		}
	};

	const onDeleteMine = async id => {
		const yes = confirm('정말 삭제하시겠습니까?');
		if (yes) {
			const res = await axios.post('/api/plan/delete', {
				planId: id,
			});
			if (res.data.success) {
				toast.handleOpen('success', '플랜을 삭제했습니다.');
				const wishRes = await axios.post(`/api/plan/list/myPlan`, {
					userId: currentUser.id,
				});
				setmyPlans(wishRes.data.plans);
			} else {
				toast.handleOpen('error', '삭제에 실패했습니다.');
			}
		}
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
							{wishPlans.length ? (
								(moreWish ? wishPlans : wishPlans.slice(0, 5)).map(plan => (
									<tr>
										<td className='plan_title'>
											<Link href='/plans/[id]' as={`/plans/${plan.id}`}>
												<a>{plan.title}</a>
											</Link>
										</td>
										<td>
											<Link href='/users/[id]' as={`/users/${plan.author?.id}`}>
												<a>{plan.author?.nickname}</a>
											</Link>
										</td>
										<td>
											<Button
												default
												onClick={() => {
													onDeleteWish(plan.id);
												}}
											>
												삭제
											</Button>
										</td>
									</tr>
								))
							) : (
								<NoItem col={3}>여행플랜이 없습니다.</NoItem>
							)}
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
							{myPlans.length ? (
								(moreMine ? myPlans : myPlans.slice(0, 5)).map(plan => (
									<tr>
										<td className='plan_title'>
											<Link href='/plans/[id]' as={`/plans/${plan.id}`}>
												<a>{plan.title}</a>
											</Link>
										</td>
										<td>{plan.hit}</td>
										<td>{0}</td>
										<td>
											<Button default>수정</Button>
										</td>
										<td>
											<Button
												default
												onClick={() => {
													onDeleteMine(plan.id);
												}}
											>
												삭제
											</Button>
										</td>
									</tr>
								))
							) : (
								<NoItem col={5}>여행플랜이 없습니다.</NoItem>
							)}
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

			<Toast {...toast}>{toast.message}</Toast>
		</MypageLayout>
	);
};

export default MyPlan;
