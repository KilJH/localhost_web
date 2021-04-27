import { Rating } from '@material-ui/lab';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '../reuse/Button';
import { UserStateContext } from '../../context/user';
import axios from 'axios';
import SERVER from '../../utils/url';
import { useInput } from '../../hooks/useInput';

interface Props {
	hostUserId: number;
}
const TextArea = styled.textarea`
	width: 100%;
	resize: none;
	height: 6em;
`;
const SubmitButton = styled(Button)`
	display: block;
	margin: 0.25em 0 0 auto;
`;
const RatingDiv = styled.div`
	margin-top: 0.5em;
	& > label {
		display: block;
		margin: 0.25em 0 0 0.25em;
	}
`;
const HostRating = styled(Rating)`
	&.MuiRating-root {
		color: #5197d5;
	}
`;

const Request = (props: Props) => {
	const { hostUserId } = props;
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(-1);
	const desc = useInput('');
	const currentUser = useContext(UserStateContext);
	const onSubmit = async (
		e: React.MouseEventHandler<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		if (desc.value === '') alert('후기를 작성해주세요!');
		else if (rating === 0) alert('별점을 등록해주세요!');
		else {
			try {
				const res = await axios.post(`${SERVER}/api/host/reviewWrite`, {
					id: currentUser.id,
					hostUserId: hostUserId,
					description: desc.value,
					rating: rating,
				});
				if (res.data.success) alert('후기가 등록되었습니다!');
			} catch (err) {
				return console.log(err);
			}
		}
	};
	return (
		<div>
			<TextArea {...desc} placeholder='후기를 작성해주세요'></TextArea>
			<RatingDiv>
				<HostRating
					value={rating}
					precision={0.5}
					onChange={(event, newValue) => {
						setRating(newValue);
					}}
					onChangeActive={(event, newHover) => {
						setHover(newHover);
					}}
				/>
				<label>
					{hover === -1
						? rating === 0
							? '별점을 선택해주세요'
							: rating
						: hover}
				</label>
			</RatingDiv>
			<SubmitButton onClick={onSubmit}>리뷰작성</SubmitButton>
		</div>
	);
};

export default Request;
