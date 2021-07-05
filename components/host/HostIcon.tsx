import React, { useState } from 'react';
import { Host } from '../../interfaces';
import styled, { keyframes } from 'styled-components';
import UserPhoto from '../user/UserPhoto';
import Rating from '../reuse/Rating';
import LanguageTag from '../reuse/LanguageTag';
import TravelStyleTag from '../reuse/TravelStyleTag';
import { InfoWindow, Marker } from '@react-google-maps/api';

interface Props {
	host?: Host;
	isShow?: boolean;
	position: { lat: number; lng: number };
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

const fadeIn = keyframes`
	from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
`;

const HostInfo = styled.section`
	width: 100%;
	height: 18rem;
	padding: 1rem 0.25rem 0 0.25rem;
	font-size: 1em;
	font-weight: normal;
	margin: auto;
	box-sizing: border-box;

	display: flex;
	flex-direction: column;

	animation: ${fadeIn} 0.3s ease;

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
`;

const HostIcon = (props: Props) => {
	const { host, isShow = true, position } = props;
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};
	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<HostIconContainer>
			{isShow && (
				<Marker
					position={position}
					icon={{
						path: google.maps.SymbolPath.CIRCLE,
						scale: 16,
						fillColor: '#333',
						fillOpacity: 0.8,
						strokeOpacity: 0,
					}}
					onClick={handleOpen} // 모바일에서 처리를 위함
					onMouseOver={handleOpen}
					onMouseOut={handleClose}
				/>
			)}
			{isOpen && (
				<InfoWindow
					position={position}
					options={{
						minWidth: 256,
					}}
				>
					<HostInfo>
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
				</InfoWindow>
			)}
		</HostIconContainer>
	);
};

export default React.memo(HostIcon);
