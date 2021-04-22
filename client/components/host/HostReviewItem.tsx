import React from 'react';
import styled from 'styled-components';
import { Review } from '../../interfaces';
import Rating from '../reuse/Rating';
import UserPhoto from '../user/UserPhoto';

interface Props {
	review?: Review;
}

const ItemContainer = styled.div`
	display: flex;
	align-items: center;
	height: 6em;
	border-bottom: 1px solid #ddd;
	padding: 0.5em 1em;
	& > div {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%;
		& h3,
		& p {
			margin: 0;
		}

		& .rating {
			display: flex;
			align-items: center;
			justify-content: space-between;
			& > div {
				color: #333;
				font-size: 0.8em;
			}
		}
	}

	&:nth-child(odd) {
		background: #eee;
	}
	&:last-child {
		border-bottom: none;
	}
`;

const HostReviewItem = ({ review }: Props) => {
	return (
		<ItemContainer>
			<UserPhoto
				src={review?.user.photo || null}
				margin='0 1em 0 0'
				width={4}
			/>
			<div>
				<div className='rating'>
					<Rating rating={review?.rating || 0} isFilled />
					<div>{review?.createTime || '2021-01-01'}</div>
				</div>
				<h3>{review?.user.nickname || '닉네임'}</h3>
				<p>{review?.description || '내용'}</p>
			</div>
		</ItemContainer>
	);
};

export default HostReviewItem;
