import { Grid, Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import React, { useContext, useState } from 'react';
import { Plan, User } from '../../interfaces/index';
import styled from 'styled-components';
import TravelDaysTag from './TravelDaysTag';
import Link from 'next/link';
import UserPhoto from '../user/UserPhoto';
import { UserStateContext } from '../../context/user';
import axios from 'axios';
import { useToast } from '../../client/hooks/useToast';
import Toast from '../reuse/Toast';
import PhotoSlider from '../reuse/PhotoSlider';

interface Props {
	plan: Plan;
	likes: number;
	isLiked: boolean;
}

const PlanOverviewGrid = styled(Grid)`
	padding: 0.5rem;
	& > div {
		position: relative;
	}
	& h2,
	p {
		// fontSize: 1.25rem,
		margin: 0;
	}
	& .price {
		text-align: right;
	}

	& .howLong {
		color: #2d3436;
		border: 1px solid #2d3436;
		padding: 0 0.25rem;
	}
`;

const PlanOverviewContent = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	& .subTitle {
		margin-bottom: 0.5rem;
		& > * {
			font-size: 0.75rem;
			margin-right: 0.25rem;
		}
	}
	& .content {
		flex: 1;
	}
	& .buttons {
		margin-top: 0.5rem;
		display: flex;
		& > button {
			height: 3rem;
			flex: 1;
			margin-right: 0.5rem;
		}
		& > button:last-child {
			flex: 3;
			margin-right: 0;
		}
		& .MuiButton-containedPrimary {
			background-color: #5197d5;
			font-weight: 700;
		}
		& .MuiButton-outlinedPrimary {
			color: #5197d5;
			&:hover {
				border: 1px solid #4187c5;
			}
		}
	}
	& .plan_flex {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	& .plan_author a {
		font-size: 0.8em;
		display: flex;
		align-items: center;
		&:hover {
			opacity: 0.9;
		}
	}
`;

const PlanAuthorInfo = React.memo(({ user }: { user: User }) => (
	<div className='plan_author'>
		<Link href='/users/[id]' as={`/users/${user.id}`}>
			<a>
				<UserPhoto width={2} src={user.photo} margin='0 0.25em' />
				{user.nickname || '닉네임'}
			</a>
		</Link>
	</div>
));

const PlanOverview: React.FC<Props> = props => {
	const { plan } = props;
	const currentUser = useContext(UserStateContext);
	const toast = useToast(false);

	const [likes, setLikes] = useState(props.likes);
	const [isLiked, setIsLiked] = useState(props.isLiked);

	const onWish = async () => {
		const res = await axios.post(`/api/plan/wishList/add`, {
			userId: currentUser.id,
			planId: plan.id,
		});
		if (res.data.success) {
			toast.handleOpen('success', '나의 여행에 담았습니다.');
		} else {
			toast.handleOpen('error', res.data.message);
		}
	};

	const onLike = async () => {
		const res = await axios.post(`/api/plan/like`, {
			userId: currentUser.id,
			planId: plan.id,
		});
		if (res.data.success) {
			const quantityRes = await axios.get(
				`/api/plan/like/quantity?planId=${plan.id}`,
			);
			setLikes(quantityRes.data.likes);
			setIsLiked(res.data.isLiked);

			toast.handleOpen('success', res.data.message);
		}
	};

	return (
		<>
			<PlanOverviewGrid container spacing={2}>
				<Grid item xs={12} md={6}>
					<PhotoSlider
						imgSrcArray={getWholeImage(plan)}
						borderRadius='1rem'
						height='24rem'
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<PlanOverviewContent>
						<h2>{plan.title}</h2>
						<div className='subTitle'>
							<TravelDaysTag
								sleepDays={plan.sleepDays as number}
								travelDays={plan.travelDays as number}
							/>
							{/* {plan!.tags!.map(tag => (
							<span className={tag}>{tag}</span>
						))} */}
						</div>

						<div className='content'>{plan.description}</div>

						<div className='plan_flex'>
							<PlanAuthorInfo user={plan.author as User} />
							<div className='price'>
								<p>
									₩{' '}
									{Intl.NumberFormat().format(
										Math.floor(plan!.price! / (plan?.travelDays ?? 1)),
									)}{' '}
									/ 일
								</p>
								<h2>₩ {Intl.NumberFormat().format(plan!.price!)}</h2>
							</div>
						</div>

						<div className='buttons'>
							<Button variant='outlined'>
								<FavoriteBorderIcon />
							</Button>
							<Button
								variant='outlined'
								onClick={onLike}
								color={isLiked ? 'primary' : 'default'}
							>
								<ThumbUpAltIcon />
								{likes}
							</Button>
							<Button variant='contained' color='primary' onClick={onWish}>
								나의 일정으로 담기
							</Button>
						</div>
					</PlanOverviewContent>
				</Grid>
			</PlanOverviewGrid>
			<Toast {...toast}>{toast.message}</Toast>
		</>
	);
};

const getWholeImage = (plan: Plan) => {
	// 썸네일을 맨 첫번째로
	let wholeImage: string[] = plan.thumb ? [plan.thumb] : [];
	plan.planDays!.forEach(planDay => {
		planDay.planTimes.forEach(planTime => {
			if (planTime.photo!.length > 0 && !(planTime.photo![0] === '')) {
				wholeImage = [...wholeImage, ...(planTime.photo as string[])];
			}
		});
	});

	return wholeImage;
};

export default PlanOverview;
