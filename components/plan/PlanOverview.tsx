import { Grid, Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import { Plan } from '../../interfaces/index';
import styled from 'styled-components';

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
	& .문화재 {
		color: #e67e22;
		border: 1px solid #e67e22;
		padding: 0 0.25rem;
	}
	& .감성 {
		color: #8e44ad;
		border: 1px solid #8e44ad;
		padding: 0 0.25rem;
	}
	& .대자연 {
		color: #27ae60;
		border: 1px solid #27ae60;
		padding: 0 0.25rem;
	}
	& .힐링 {
		color: #ff9ff3;
		border: 1px solid #ff9ff3;
		padding: 0 0.25rem;
	}
	& .먹부림 {
		color: #e74c3c;
		border: 1px solid #e74c3c;
		padding: 0 0.25rem;
	}
`;

const PlanOverviewImg = styled.div`
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
`;

const PlanOverview: React.FC<Props> = props => {
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
					<img alt='여행사진' src={`/img/plan/plan${props.plan.id}.jpeg`}></img>
				</PlanOverviewImg>
			</Grid>
			<Grid item xs={12} md={6}>
				<PlanOverviewContent>
					<h2>{props.plan.title}</h2>
					<div className='subTitle'>
						<span className='howLong'>
							{props.plan.sleepDays}박{props.plan.travelDays}일
						</span>
						{props.plan!.tags!.map(tag => (
							<span className={tag}>{tag}</span>
						))}
					</div>

					<div className='content'>{props.plan.description}</div>

					<div className='price'>
						<p>
							₩{' '}
							{Intl.NumberFormat().format(
								Math.floor(props.plan!.price! / props.plan.travelDays),
							)}{' '}
							/ 일
						</p>
						<h2>₩ {Intl.NumberFormat().format(props.plan!.price!)}</h2>
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
