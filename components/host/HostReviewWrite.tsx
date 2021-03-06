import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../reuse/Button';
import axios from 'axios';
import { useInput } from '../../client/hooks/useInput';
import Textarea from '../reuse/Textarea';
import Router from 'next/router';
import { useToast } from '../../client/hooks/useToast';
import Toast from '../reuse/Toast';

interface Props {
	applicationId: number;
	onClose?: Function;
}

const Label = styled.p`
	margin: 2em 0 1em 0;
	font-size: 0.95em;
	font-weight: bold;
`;
const SubmitButton = styled(Button)`
	display: block;
	margin: 0.5em 0 0 auto;
`;
const RatingDiv = styled.div`
	height: 1.5em;
	margin: 0 0 1em 0.25em;
	display: flex;
	align-items: center;
	& > label {
		margin-left: 0.25em;
		color: #5197d5;
		font-weight: bold;
		font-size: 1.25em;
		display: inline;
	}
`;
const HostRating = styled(Rating)`
	&.MuiRating-root {
		color: #5197d5;
	}
`;

const Request = (props: Props) => {
	const { applicationId, onClose } = props;
	const [rating, setRating] = useState<number | null>(null);
	const [hover, setHover] = useState(-1);
	const desc = useInput('');
	const toast = useToast(false);
	const onSubmit = async () => {
		if (rating === 0 || rating === null) {
			toast.handleOpen('warning', '별점을 등록해주세요!');
		} else if (desc.value === '') {
			toast.handleOpen('warning', '내용을 작성해주세요!');
		} else {
			try {
				const res = await axios.post(`/api/host/review/write`, {
					id: applicationId,
					description: desc.value,
					rating: rating,
				});
				if (res.data.success) {
					alert('후기가 등록되었습니다!');
					onClose!();
					Router.push('/users/mypage/host');
				}
			} catch (err) {
				return console.log(err);
			}
		}
	};
	return (
		<div>
			<Label>별점을 등록해주세요</Label>
			<RatingDiv>
				<HostRating
					value={rating}
					precision={0.5}
					onChange={(_event, newValue) => {
						setRating(newValue);
					}}
					onChangeActive={(_event, newHover) => {
						setHover(newHover);
					}}
				/>
				<label>
					{hover === -1
						? rating == null || (rating! as number).toFixed(1) + '점'
						: hover.toFixed(1)}
				</label>
			</RatingDiv>
			<Label>후기를 작성해주세요</Label>
			<Textarea
				{...desc}
				height='8em'
				placeholder='따뜻한 후기는 호스트에게 큰 힘이 됩니다:)'
			></Textarea>
			<SubmitButton onClick={onSubmit}>리뷰작성</SubmitButton>
			<Toast {...toast}>{toast.message}</Toast>
		</div>
	);
};

export default Request;
