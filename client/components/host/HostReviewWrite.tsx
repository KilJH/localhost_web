import React from 'react';
import styled from 'styled-components';
import Button from '../reuse/Button';

interface Props {}

const TextArea = styled.textarea`
	width: 100%;
	resize: none;
	height: 6em;
`;
const SubmitButton = styled(Button)`
	display: block;
	margin: 0.25em 0 0 auto;
`;

const Request = (props: Props) => {
	return (
		<div>
			<TextArea></TextArea>
			<SubmitButton>리뷰작성</SubmitButton>
		</div>
	);
};

export default Request;
