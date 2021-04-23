import React from 'react';
import styled from 'styled-components';

interface Props {
	src?: string;
	width?: number;
	onClick?: React.MouseEventHandler;
	margin?: string;
	hover?: boolean;
}

interface PhotoProps {
	width: number;
	margin: string;
	hover?: boolean;
}

const Photo = styled.img<PhotoProps>`
	width: ${props => props.width || 5}em;
	height: ${props => props.width || 5}em;
	border-radius: 50%;
	margin: ${props => props.margin || '0 auto'};
	display: block;
	transition: all 0.3s ease;
	object-fit: cover;
	&:hover {
		opacity: ${props => (props.hover ? 0.8 : 1)};
		cursor: ${props => (props.hover ? 'pointer' : 'default')};
	}
`;

const UserPhoto = (props: Props) => {
	return (
		<Photo
			src={props.src || '/img/default.jpg'}
			width={props.width}
			onClick={props.onClick}
			margin={props.margin}
			hover={props.hover}
		/>
	);
};

export default UserPhoto;
