import React, { Component } from 'react';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import StarHalfRoundedIcon from '@material-ui/icons/StarHalfRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import styled from 'styled-components';

interface Props {
  rating: number;
}

const StarOutlined = styled(StarOutlineRoundedIcon)`
  color: #5197d5;
`;
const StarHalfFilled = styled(StarHalfRoundedIcon)`
  color: #5197d5;
`;
const StarFilled = styled(StarRoundedIcon)`
  color: #5197d5;
`;
const StarDiv = styled.div`
  display: inline;
`;
const Rating = ({ rating }: Props) => {
  const drawFullStar = () => {
    switch (Math.floor(rating)) {
      case 5:
        return (
          <StarDiv>
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
          </StarDiv>
        );
      case 4:
        return (
          <StarDiv>
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
          </StarDiv>
        );
      case 3:
        return (
          <StarDiv>
            <StarFilled />
            <StarFilled />
            <StarFilled />
          </StarDiv>
        );
      case 2:
        return (
          <StarDiv>
            <StarFilled />
            <StarFilled />
          </StarDiv>
        );
      case 1:
        return (
          <StarDiv>
            <StarFilled />
          </StarDiv>
        );
    }
  };
  const drawRestStar = () => {
    const decimal = rating - Math.floor(rating);
    if (decimal <= 0) return;
    else if (decimal < 0.5) return <StarOutlined />;
    else return <StarHalfFilled />;
  };
  return (
    <StarDiv>
      {drawFullStar()}
      {drawRestStar()}
    </StarDiv>
  );
};

export default Rating;
