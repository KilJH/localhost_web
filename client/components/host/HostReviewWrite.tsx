import React from 'react';
import styled from 'styled-components';
import Button from '../reuse/Button';
import Rating from '../reuse/Rating';

interface Props {
	id: number;
	hostUserId: number;
	description: string;
}

const TextArea = styled.textarea`
	width: 100%;
	resize: none;
	height: 6em;
`;
const RatingStar = styled(Rating)``;
const SubmitButton = styled(Button)`
	display: block;
	margin: 0.25em 0 0 auto;
`;

const Request = (props: Props) => {
	return (
		<div>
			<TextArea></TextArea>
			<RatingStar rating={5.0}></RatingStar>
			<SubmitButton>리뷰작성</SubmitButton>
		</div>
	);
};

export default Request;
