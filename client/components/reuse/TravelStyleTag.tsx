import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
	travelStyle: string;
	onClick?: MouseEventHandler<HTMLSpanElement>;
	on?: boolean;
}

const Tag = styled.span<Props & { color: string }>`
	display: inline-block;
	margin: 0.25em;
	padding: 0.25em;
	box-sizing: border-box;
	font-weight: 500;
	font-size: 0.8em;

	transition: all ease 0.2s;

	box-shadow: 0px 2px 1px -2px rgb(0 0 0 / 20%),
		0px 1px 2px 0px rgb(0 0 0 / 14%), 0px 0px 5px 0px rgb(0 0 0 / 12%);
	/* 클릭가능하면 기본색 */
	cursor: ${props => (props.onClick ? 'pointer' : 'default')};
	color: ${props => (props.onClick && !props.on ? '#aaa' : props.color)};
	background-color: ${props => (props.onClick && !props.on ? '#eee' : 'white')};
	border: ${props =>
		props.onClick && !props.on ? '2px solid #aaa' : `2px solid ${props.color}`};

	&:first-child {
		margin-left: 0;
	}
	&:last-child {
		margin-right: 0;
	}
`;

const TravelStyleTag = (props: Props) => {
	const { travelStyle } = props;

	let color = '#aaa';

	switch (travelStyle) {
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
	}

	return (
		<Tag {...props} color={color}>
			{props.travelStyle}
		</Tag>
	);
};

export default TravelStyleTag;
