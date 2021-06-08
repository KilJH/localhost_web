import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
	label: string;
	onClick?: MouseEventHandler<HTMLSpanElement>;
	checked?: boolean;
}

const Tag = styled.span<Props & { color: string }>`
	display: inline-block;
	margin: 0.5em;
	padding: 0.25em 0.5em;
	box-sizing: border-box;
	font-weight: 500;
	font-size: 0.8em;

	transition: all ease 0.2s;

	user-select: none;

	box-shadow: 0px 2px 1px -2px rgb(0 0 0 / 20%),
		0px 1px 2px 0px rgb(0 0 0 / 14%), 0px 0px 5px 0px rgb(0 0 0 / 12%);
	/* 클릭가능하면 기본색 */
	cursor: ${props => (props.onClick ? 'pointer' : 'default')};
	color: ${props => (props.onClick && !props.checked ? '#aaa' : props.color)};
	background-color: ${props =>
		props.onClick && !props.checked ? '#eee' : 'white'};
	border: ${props =>
		props.onClick && !props.checked
			? '2px solid #aaa'
			: `2px solid ${props.color}`};

	&:first-child {
		margin-left: 0;
	}
	&:last-child {
		margin-right: 0;
	}
`;

const TravelStyleTag = (props: Props) => {
	const { label } = props;

	let color = '#aaa';

	switch (label) {
		case '문화재':
			color = '#e67e22';
			break;
		case '감성':
			color = '#8e44ad';
			break;
		case '대자연':
			color = '#27ae60';
			break;
		case '힐링':
			color = '#ff9ff3';
			break;
		case '먹부림':
			color = '#e74c3c';
			break;
		case '쇼핑':
			color = '#a7ecf2';
			break;
		default:
			color = '#5197d6';
			break;
	}

	return (
		<Tag {...props} color={color}>
			{label}
		</Tag>
	);
};

export default React.memo(TravelStyleTag);
