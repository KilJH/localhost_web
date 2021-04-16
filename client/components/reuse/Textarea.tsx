import React from 'react';
import styled from 'styled-components';

interface Props {
	value?: string | number;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
	height?: string;
}
const StyledTextarea = styled.textarea<Props>`
	font-size: 0.8em;
	border-radius: 0.25rem;
	border: 1px solid rgba(0, 0, 0, 0.42);
	width: 100%;
	padding: 0.75rem;
	height: ${(props) => props.height || '16em'};

	box-sizing: border-box;

	resize: none;

	font-family: inherit;

	transition: border 0.2s ease;
	&:hover {
		border: 2px solid rgba(0, 0, 0, 0.87);
	}
	&:focus {
		outline: none;
		border: 2px solid rgb(58, 75, 170);
	}
`;

const Textarea = (props: Props) => {
	const { value, onChange, height } = props;
	return <StyledTextarea value={value} onChange={onChange} height={height} />;
};

export default Textarea;
