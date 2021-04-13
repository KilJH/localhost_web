import { type } from 'node:os';
import React from 'react';
import styled from 'styled-components';

interface Props {
	children?: React.ReactNode;
	width?: string;
	padding?: string;
	default?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button<Props>`
	color: ${(props) => (props.default ? 'black' : 'white')};
	background-color: ${(props) =>
		props.default ? '#ddd' : 'rgb(81, 151, 213, 1)'};
	width: ${(props) => props.width || ''};
	border: none;
	padding: ${(props) => props.padding || '0.5rem 1rem'};
	transition: all 0.3s ease;
	&:hover {
		background-color: ${(props) =>
			props.default ? '#aaa' : 'rgb(61, 131, 203, 1)'};
	}
`;

const Button = (props: Props) => {
	const { children, width, padding, type, onClick } = props;
	return (
		<StyledButton
			width={width}
			onClick={onClick}
			padding={padding}
			default={props.default}
			type={type}
		>
			{children}
		</StyledButton>
	);
};

export default Button;
