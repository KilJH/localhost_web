import { LocationOn } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { PlanTime } from '../../interfaces';
import PhotoSlider from '../reuse/PhotoSlider';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Modal } from '@material-ui/core';
import { useModal } from '../../client/hooks/useModal';
import PlanMap from './PlanMap';

interface Props {
	plan: PlanTime;
	onDelete?: (time: Date) => void;
}

const DeleteContainer = styled.div`
	padding: 0;
	max-width: 2em;
	margin: 0.25rem !important;
	& button {
		min-width: 1em;
		min-height: 1em;
		max-width: 2em;
		max-height: 2em;
		width: 4em;
		height: 4em;
		border-radius: 50%;
	}
	/* 자리를 차지해야하기 때문에 display가 아니라 opacity 속성을 조작 */
	opacity: 0;
	transition: opacity 0.1s ease;
`;

const ItemContainer = styled.div`
	border-left: 1px solid #aaa;
	display: flex;
	padding-left: 1em;
	width: 100%;
	margin-top: 0 !important;
	margin-bottom: 0 !important;

	animation: fadeIn 0.5s ease;

	& .timeItem {
		font-weight: 600;
	}

	& .placeItem {
		display: flex;
		align-items: flex-start;
		& .placeDetail {
			margin: 0.125em;
			display: flex;
			align-items: center;
			font-size: 0.8em;
			color: #333;
			cursor: pointer;
			min-width: 50px;

			transition: font-weight color 0.1s ease;
			& > svg {
				font-size: 1.2em;
			}

			&:hover {
				color: black;
				font-weight: 500;
			}
		}
	}
	& .priceItem {
		&::before {
			content: '₩ ';
		}
	}

	& .descriptionItem {
		color: #666;
		font-size: 0.8em;
		white-space: break-spaces;
	}

	& > div {
		margin: 0.5rem 1em;
		z-index: 1;
		& > * {
			margin: 0.5rem 0;
		}
	}

	& div.placeWrapper {
		flex: 1;
		margin: 0 0.25em;
	}

	&::before {
		content: url('/img/circle.svg');
		color: #5197d5;
		transform: translate(calc(-1em - 0.5rem), 1rem);
		width: 1rem;
		height: 1rem;
	}

	& .plan_flex {
		display: flex;

		&.column {
			flex-direction: column;
		}
	}

	&:hover {
		${DeleteContainer} {
			opacity: 1;
		}
	}
`;

const StyledModal = styled(Modal)`
	display: flex;
	align-items: center;
	justify-content: center;

	& > .map_container {
		width: 80vw;
		height: 50vh;
		max-width: 800px;
		background: rgba(255, 255, 255, 0.9);
		padding: 1rem;
		border-radius: 0.25rem;
		outline: 0;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3), -2px -2px 8px rgba(0, 0, 0, 0.3);
	}
`;

const PlanTimeItem = (props: Props) => {
	const { plan, onDelete } = props;

	const map = useModal(false);

	return (
		<ItemContainer>
			{onDelete && (
				<DeleteContainer>
					<Button onClick={() => onDelete(plan.time as Date)}>
						<CloseIcon fontSize='small' />
					</Button>
				</DeleteContainer>
			)}
			<div>
				<div className='timeItem'>{plan.time.toString()}</div>
				<div style={{ textAlign: 'center', fontSize: '0.8em' }}>
					{plan.type === '이동' ? '이동' : ''}
				</div>
			</div>
			<div className='plan_flex column' style={{ flex: 1 }}>
				<div className='plan_flex'>
					<div className='placeWrapper'>
						<div className='placeItem'>
							{plan.place.name}
							{plan.place.geometry?.location.lat && (
								<>
									<span className='placeDetail' onClick={map.handleOpen}>
										<LocationOn />
										지도보기
									</span>
									<StyledModal open={map.open} onClose={map.handleClose}>
										<div className='map_container'>
											<PlanMap place={plan.place} />
										</div>
									</StyledModal>
								</>
							)}
						</div>
						<div className='descriptionItem'>{plan.description}</div>
					</div>
					{plan.price !== 0 && (
						<div className='priceItem'>{plan.price.toLocaleString()}</div>
					)}
				</div>
				<div>
					{plan.photo && (
						<PhotoSlider
							imgSrcArray={plan.photo}
							height='auto'
							borderRadius='1rem'
						/>
					)}
				</div>
			</div>
		</ItemContainer>
	);
};

export default React.memo(PlanTimeItem);
