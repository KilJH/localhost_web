import React, { useState } from 'react';
import { Host } from '../../interfaces';
import PersonIcon from '@material-ui/icons/Person';
import styled from 'styled-components';
import UserPhoto from '../user/UserPhoto';
import { Fade } from '@material-ui/core';

interface Props {
	host?: Host;
	isShow?: boolean;
	lat?: number;
	lng?: number;
}

const HostIconContainer = styled.div`
	/* 호스트의 성향에 따라 색상 */
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	& svg {
		&:hover {
			opacity: 0.8;
			cursor: pointer;
		}
	}
`;

const HostInfo = styled.section`
	width: 16rem;
	height: 24rem;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 0.5rem;
	padding: 1rem;
	position: absolute;
	z-index: 15;
	font-size: 1.2em;

	animation: fadeIn 0.3s ease;

	& .distance,
	& .nickname {
		text-align: center;
	}

	& .distance {
		font-size: 0.8em;
	}
	& .nickname {
		margin-bottom: 0;
	}

	& .description {
		white-space: pre-line;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

const HostIcon = (props: Props) => {
	const { host, isShow = true } = props;
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};
	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<Fade in={isShow} timeout={500}>
			<HostIconContainer>
				<div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
					<PersonIcon fontSize='large' style={{ color: '#333' }} />
				</div>
				{isOpen ? (
					<HostInfo onMouseEnter={handleOpen} onMouseLeave={handleClose}>
						<UserPhoto src={host?.photo} />
						<h3 className='nickname'>{host.nickname}</h3>
						<div className='distance'>
							{host.place.geometry.distance.toFixed(2)}km
						</div>
						<div className='languages'></div>
						<p className='description'>{host.description}</p>
					</HostInfo>
				) : (
					''
				)}
			</HostIconContainer>
		</Fade>
	);
};

export default HostIcon;
