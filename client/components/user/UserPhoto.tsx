import React from 'react';
import styled from 'styled-components';

interface Props {
	src?: string;
	width?: number;
	onClick?: React.MouseEventHandler;
}

interface PhotoProps {
	width: number;
}

const Photo = styled.img<PhotoProps>`
	width: ${(props) => props.width || 5}em;
	border-radius: 50%;
	margin: 0 auto;
	display: block;
`;

const UserPhoto = (props: Props) => {
	return (
		<Photo
			src={props.src || '/img/default.jpg'}
			width={props.width}
			onClick={props.onClick}
		/>
	);
};

export default UserPhoto;
