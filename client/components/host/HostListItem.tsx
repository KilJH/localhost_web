import React from 'react';
import { Host } from '../../interfaces';
import styled from 'styled-components';
import UserPhoto from '../user/UserPhoto';
import Button from '../reuse/Button';
import Link from 'next/link';
import Rating from '../reuse/Rating';
import LanguageTag from '../reuse/LanguageTag';

interface Props {
	host: Host;
}

const HostListItemContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0.5rem;
	height: 7em;

	cursor: pointer;
	transition: opacity 0.2s ease;
	& div.flex {
		display: flex;
		justify-content: space-between;
	}
	& div.flexColumn {
		flex-direction: column;
		flex: 1;
	}
	& h3,
	& p {
		margin: 0;
	}

	& .point {
		font-size: 0.8em;
		display: flex;
		align-items: center;

		& > .point_detail {
			position: relative;
			display: none;

			& span {
				border-radius: 0.25rem;
				padding: 0.25em 0.5em;

				position: absolute;
				top: 0.8em;
				left: -2.4em;

				background: #5197d5;
				color: #eee;
				overflow: hidden;
			}
		}
		&:hover {
			& > .point_detail {
				display: block;
				animation: fadeIn 0.3s ease;
			}
		}
	}

	& .name {
		align-items: center;
		& h3 {
			max-width: 85px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	& .description {
		font-size: 0.9em;
		color: #333;
		white-space: pre-line;

		overflow: hidden;
		height: 2rem;

		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	& .language {
		display: flex;
		align-items: flex-end;
		font-size: 0.8em;
		& span {
			margin: 0 0.25em;
			border: 1px solid #333;
			padding: 0 0.25em;
		}
	}
	& .follower {
		font-size: 0.6em;
		margin-left: 0.25rem;
	}

	&:hover {
		opacity: 0.9;
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

const HostListItem = (props: Props) => {
	const { host } = props;
	const randomRating = Number((Math.random() * 5).toFixed(1));
	return (
		<HostListItemContainer>
			<UserPhoto src={host.photo} width={5} margin='0 0.5rem' />
			<div className='flex flexColumn'>
				<div className='flex'>
					<div className='flex name'>
						<h3 title={host.nickname}>{host.nickname}</h3>
						<p className='follower'>팔로워 {host.follower}</p>
					</div>
					<div className='point'>
						<Rating rating={randomRating} isFilled />
						<div className='point_detail'>
							<span>{randomRating.toFixed(1)}</span>
						</div>
					</div>
				</div>
				<p className='description'>{host.description}</p>
				<div className='flex'>
					<div className='language'>
						{host?.languages.map(lang =>
							lang ? <LanguageTag language={lang} key={lang} /> : '',
						)}
					</div>

					<Link href='/hosts/[id]' as={`/hosts/${host.id}`}>
						<a>
							<Button>자세히보기</Button>
						</a>
					</Link>
				</div>
			</div>
		</HostListItemContainer>
	);
};

export default HostListItem;
