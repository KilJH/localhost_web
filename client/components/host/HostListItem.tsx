import React from 'react';
import { Host } from '../../interfaces';
import styled from 'styled-components';
import UserPhoto from '../user/UserPhoto';
import Button from '../reuse/Button';
import Link from 'next/link';

interface Props {
	host: Host;
}

const HostListItemContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0.5rem;

	& div.flex {
		display: flex;
		justify-content: space-between;
	}
	& div.flexColumn {
		flex-direction: column;
		flex: 1;
	}
	& h4 {
		margin: 0;
	}

	& .point {
		font-size: 0.8em;
		& span {
			display: inline-block;
			border-radius: 0.25rem;
			padding: 0.25em 0.5em;
			margin: 0 0.25em;

			background: #5197d5;
			color: #eee;
		}
	}

	& .description {
		margin: 0;
		flex: 1;
		font-size: 0.9em;
		color: #333;
		white-space: pre-line;
		overflow: hidden;
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
`;

const HostListItem = (props: Props) => {
	const { host } = props;
	return (
		<HostListItemContainer>
			<UserPhoto src={host.photo} width={6} margin='0 0.5rem' />
			<div className='flex flexColumn'>
				<h4>{host.nickname}</h4>
				<div className='point'>
					⭐️⭐️⭐️⭐️⭐️ <span>5.0</span>
				</div>
				<p className='description'>{host.description}</p>
				<div className='flex'>
					<div className='language'>
						<span>{host.language1}</span>
						<span>{host.language2}</span>
						<span>{host.language3}</span>
					</div>

					<Link href='/hosts/[id]' as={`/hosts/${host.id}`}>
						<Button>자세히보기</Button>
					</Link>
				</div>
			</div>
		</HostListItemContainer>
	);
};

export default HostListItem;
