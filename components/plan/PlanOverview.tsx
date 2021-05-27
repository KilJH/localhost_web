import { Grid, Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import { Plan } from '../../interfaces/index';
import styled from 'styled-components';
import TravelDaysTag from './TravelDaysTag';
import Link from 'next/link';
import UserPhoto from '../user/UserPhoto';

interface Props {
	plan: Plan;
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

const PlanOverviewImg = styled.div`
	height: 512px;
	& > img {
		width: 100%;
		height: 100%;
		max-height: 42rem;
		object-fit: cover;
		border-radius: 1rem;
	}
	& .imgBtnWrapper {
		position: absolute;
		width: calc(100% - 1rem);
		height: calc(100% - 1rem);
		max-height: 42rem;
		& > button {
			height: 100%;
			padding: 0;
			border-radius: 1rem 0 0 1rem;
			&.MuiButton-root:hover {
				background: linear-gradient(
					90deg,
					rgba(0, 0, 0, 0.4),
					rgba(0, 0, 0, 0)
				);
			}

			& + button {
				float: right;
				border-radius: 0 1rem 1rem 0;

				&.MuiButton-root:hover {
					background: linear-gradient(
						90deg,
						rgba(0, 0, 0, 0),
						rgba(0, 0, 0, 0.4)
					);
				}
			}
		}
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

const PlanOverview: React.FC<Props> = props => {
	const { plan } = props;
	return (
		<PlanOverviewGrid container spacing={2}>
			<Grid item xs={12} md={6}>
				<PlanOverviewImg>
					<div className='imgBtnWrapper'>
						<Button>
							<ArrowBackIosIcon />
						</Button>
						<Button>
							<ArrowForwardIosIcon />
						</Button>
					</div>
					<img
						alt='여행사진'
						src={plan.thumb || '/img/logos/localhostLogoBlack.png'}
					></img>
				</PlanOverviewImg>
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
						<div className='plan_author'>
							<Link href='/users/[id]' as={`/users/${plan.author?.id}`}>
								<a>
									<UserPhoto
										width={2}
										src={plan.author?.photo}
										margin='0 0.25em'
									/>
									{plan.author?.nickname || '닉네임'}
								</a>
							</Link>
						</div>
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
						<Button variant='outlined'>
							<ThumbUpAltIcon />0
						</Button>
						<Button variant='contained' color='primary'>
							나의 일정으로 담기
						</Button>
					</div>
				</PlanOverviewContent>
			</Grid>
		</PlanOverviewGrid>
	);
};

export default PlanOverview;
