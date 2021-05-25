import { LocationOn } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PlanTime } from '../../interfaces';
import PhotoSlider from '../reuse/PhotoSlider';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Fade, Modal } from '@material-ui/core';
import { useModal } from '../../client/hooks/useModal';
import PlanMap from './planMap';

interface Props {
	plan: PlanTime;
	onDelete?: React.MouseEventHandler<HTMLButtonElement>;
}

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
		align-items: center;
		& .placeDetail {
			margin-left: 0.5rem;
			display: flex;
			align-items: center;
			font-size: 0.8em;
			color: #333;
			cursor: pointer;

			transition: font-weight color 0.1s ease;
			& > svg {
				font-size: 1.5em;
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
		white-space: pre;
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
	}

	&::before {
		content: url('/img/circle.svg');
		color: #5197d5;
		transform: translate(calc(-1em - 0.5rem), 1rem);
		width: 1rem;
		height: 1rem;
	}
`;

const DeleteContainer = styled.div`
	padding: 0;
	max-width: 2em;
	margin: 0.25rem !important;
	& button {
		padding: 0;
		max-width: 1em;
		max-height: 1em;
		min-width: 2em;
		min-height: 2em;
		width: 4em;
		height: 4em;
		border-radius: 50%;
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
	const [isShow, setIsShow] = useState(false);
	const handleOpen = () => {
		setIsShow(true);
	};
	const handleClose = () => {
		setIsShow(false);
	};

	const map = useModal(false);

	return (
		<ItemContainer onMouseEnter={handleOpen} onMouseLeave={handleClose}>
			{onDelete ? (
				<Fade in={isShow}>
					<DeleteContainer>
						<Button onClick={onDelete}>
							<CloseIcon fontSize='small' />
						</Button>
					</DeleteContainer>
				</Fade>
			) : (
				''
			)}
			<div>
				<div className='timeItem'>{plan.time.toString()}</div>
				<div style={{ textAlign: 'center', fontSize: '0.8em' }}>
					{plan.type === '이동' ? '이동' : ''}
				</div>
			</div>
			<div className='placeWrapper'>
				<div className='placeItem'>
					{plan.place.name}
					{plan.place.geometry ? (
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
					) : (
						''
					)}
				</div>
				<div className='descriptionItem'>{plan.description}</div>
				<div>
					{plan.photo ? (
						<PhotoSlider
							imgSrcArray={plan.photo}
							height='auto'
							borderRadius='1rem'
						/>
					) : (
						''
					)}
				</div>
			</div>
			{plan.price !== 0 ? (
				<div className='priceItem'>{plan.price.toLocaleString()}</div>
			) : (
				''
			)}
		</ItemContainer>
	);
};

export default PlanTimeItem;
