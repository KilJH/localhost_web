import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	width?: string;
	border?: string;
	borderRadius?: string;
	textAlign?: string;
	padding?: string;
	margin?: string;
}

const StyledInput = styled.input<InputProps>`
	font-size: 0.8em;
	border-radius: ${props => props.borderRadius || 0};
	border: ${props => props.border || 'none'};
	border-bottom: ${props =>
		props.border ? '' : '1px solid rgba(0, 0, 0, 0.42)'};
	text-align: ${props => props.textAlign || 'center'};
	padding: ${props => props.padding || '0.75rem'};
	margin: ${props => props.margin || ''};
	width: ${props => props.width || '8em'};
	height: 2.5rem;
	box-sizing: border-box;

	transition: all 0.2s ease;

	&:hover {
		border-width: 2px;
		border-color: rgba(0, 0, 0, 0.87);
	}
	&:focus {
		border-width: 2px;
		border-color: rgb(81, 151, 213);
	}

	&[type='number']::-webkit-inner-spin-button,
	&[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const Input = (props: InputProps) => {
	const {
		width,
		border,
		borderRadius,
		textAlign,
		type,
		padding,
		margin,
		...other
	} = props;
	return (
		<StyledInput
			width={width}
			border={border}
			borderRadius={borderRadius}
			textAlign={textAlign}
			type={type}
			padding={padding}
			margin={margin}
			{...other}
		/>
	);
};

export default Input;
