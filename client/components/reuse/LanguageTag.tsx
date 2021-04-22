import React from 'react';
import styled from 'styled-components';

interface Props {
	language: string;
}

const Tag = styled.span`
	font-size: 0.8em;
	border: 1px solid #333;
	color: #333;
	margin: 0 0.25em;
	padding: 0 0.25em;
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

export default LanguageTag;
