import React from 'react';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import StarHalfRoundedIcon from '@material-ui/icons/StarHalfRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import styled from 'styled-components';

interface Props {
	rating: number;
	isFilled?: boolean;
}

const StarDiv = styled.div`
	display: inline-block;
	& > svg {
		color: #5197d5;
		font-size: 1.8em !important;
	}
`;

const drawFullStar = (rating: number) => {
	const icons: JSX.Element[] = [];
	for (let i = 0; i < Math.floor(rating); i++) {
		icons.push(<StarRoundedIcon key={i} />);
	}

	return icons;
};

const fillTheSpace = (rating: number) => {
	const icons: JSX.Element[] = [];
	for (let i = 5; i > Math.ceil(rating); i--) {
		icons.push(<StarOutlineRoundedIcon key={i} />);
	}

	return icons;
};

const drawRestStar = (rating: number) => {
	const decimal = rating - Math.floor(rating);
	if (decimal <= 0) return;
	else if (decimal < 0.5) return <StarOutlineRoundedIcon />;
	else return <StarHalfRoundedIcon />;
};

const Rating = (props: Props) => {
	const { rating, isFilled } = props;

	return (
		<StarDiv>
			{rating <= 5 ? drawFullStar(rating) : 'excessed the boundary'}
			{rating <= 5 ? drawRestStar(rating) : ''}
			{rating <= 5 ? !isFilled || fillTheSpace(rating) : ''}
		</StarDiv>
	);
};

export default Rating;
