import React, { useState } from 'react';
import { Host } from '../../interfaces';
import PersonIcon from '@material-ui/icons/Person';
import styled from 'styled-components';
import UserPhoto from '../user/UserPhoto';
import { Fade } from '@material-ui/core';
import Rating from '../reuse/Rating';
import LanguageTag from '../reuse/LanguageTag';
import TravelStyleTag from '../reuse/TravelStyleTag';

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
	width: 12rem;
	height: 18rem;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 0.5rem;
	padding: 1rem;
	position: absolute;
	z-index: 15;
	font-size: 1.2em;

	display: flex;
	flex-direction: column;

	animation: fadeIn 0.3s ease;

	& .distance,
	& .nickname,
	& .rating {
		text-align: center;
	}

	& .distance {
		font-size: 0.8em;
	}
	& .nickname {
		margin-bottom: 0;
	}

	& .description {
		white-space: break-spaces;
		flex: 1;
	}

	& .flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
						<h3 className='nickname'>{host!.nickname}</h3>
						<div className='distance'>
							{host!.place!.geometry!.distance!.toFixed(2)}km
						</div>
						<div className='rating'>
							<Rating rating={host?.rating || 0} isFilled />
						</div>
						<p className='description'>{host!.description}</p>

						<div className='flex'>
							<div className='languages'>
								{host?.languages.map(
									lang =>
										lang &&
										lang !== ' ' && <LanguageTag language={lang} key={lang} />,
								)}
							</div>
							<div className='travelStyle'>
								{host?.tag ? <TravelStyleTag label={host!.tag} /> : ''}
							</div>
						</div>
					</HostInfo>
				) : (
					''
				)}
			</HostIconContainer>
		</Fade>
	);
};

export default React.memo(HostIcon);
