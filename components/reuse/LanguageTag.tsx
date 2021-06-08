import React from 'react';
import styled from 'styled-components';

interface Props {
	language: string;
}

const Tag = styled.span`
	display: inline-block;
	font-size: 0.8em;
	border: 2px solid #666;
	font-size: 500;
	color: #666;
	margin: 0.25em;
	padding: 0.25em;

	box-shadow: 0px 2px 1px -2px rgb(0 0 0 / 20%),
		0px 1px 2px 0px rgb(0 0 0 / 14%), 0px 0px 5px 0px rgb(0 0 0 / 12%);
	&:first-child {
		margin-left: 0;
	}
	&:last-child {
		margin-right: 0;
	}
`;

const LanguageTag = (props: Props) => {
	return <Tag>{props.language}</Tag>;
};

export default React.memo(LanguageTag);
