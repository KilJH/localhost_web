import React from 'react';
import { Plan } from '../../interfaces/index';
import styled from 'styled-components';

interface Props {
	plan: Plan;
}

const StyledListRoot = styled.div`
	display: flex;
	padding: 0.5rem;
	height: 8em;
	overflow: hidden;
	cursor: pointer;

	box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);

	transition: all 0.5s ease;

	&:hover {
		background: rgba(0, 0, 0, 0.1);
	}
	& .thumb {
		height: 8em;
		width: 8em;
		object-fit: cover;
		display: block;
		border-radius: 1em;
		margin-right: 1em;
	}
`;

const StyledListBody = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	& > div {
		display: flex;
		margin: 0 0 0.5em 0;
		& h2 {
			margin: 0;
			font-size: 1.25em;
		}
		& .title {
			flex: 5;
			& > span {
				font-size: 0.75em;
				margin-right: 0.25em;
			}
		}
		& .price {
			flex: 3;
			text-align: right;
			& > p {
				font-size: 0.75em;
			}
		}
	}
	& p {
		margin: 0;
	}

	& .description {
		margin: 0;
		overflow: hidden;
		flex: 1;
	}
	& .howLong {
		color: #2d3436;
		border: 1px solid #2d3436;
		padding: 0 0.25rem;
	}
`;

const PlanItem = (props: Props) => {
	const { plan } = props;
	return (
		<StyledListRoot>
			<img
				className='thumb'
				alt='thumbnail'
				src={plan.thumbnail ?? 'https://via.placeholder.com/128'}
			></img>
			<StyledListBody>
				<div>
					<div className='title'>
						<h2>{plan.title}</h2>
						<span className='howLong'>
							{plan.sleepDays === 0 && plan.travelDays! <= 1
								? '당일치기'
								: plan.sleepDays === 0
								? `무박${plan.travelDays}일`
								: `${plan.sleepDays}박${plan.travelDays}일`}
						</span>
						{/* {plan!.tags!.map(tag => (
							<span className={tag} key={tag}>
								{tag}
							</span>
						))} */}
					</div>
					<div className='price'>
						<h2>₩ {Intl.NumberFormat().format(plan!.price!)}</h2>
						<p>
							₩{' '}
							{Intl.NumberFormat().format(
								Math.floor(plan!.price! / (plan?.travelDays ?? 1)),
							)}
							/ 일
						</p>
					</div>
				</div>
				<div className='description'>
					<p>{plan.description}</p>
				</div>
			</StyledListBody>
		</StyledListRoot>
	);
};

export default PlanItem;
