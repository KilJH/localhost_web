import React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import { User } from '../../../interfaces/index';
import UserPhoto from '../UserPhoto';
import Link from 'next/link';

interface Props {
	id: string;
	followingUsers?: User[];
	followers?: User[];
}

const AvatarItem = styled.div`
	width: 5rem;
	& > div {
		margin: 0 auto;
	}
	& p {
		margin: 0;
	}
	text-align: center;
`;

const FollowContainer = styled.div`
	display: flex;
	& > div {
		width: 5rem;
		text-align: center;
		overflow: hidden;
		& p {
			margin: 0.25rem auto;
			height: 1em;
		}
	}
`;

const MoreButton = styled.div`
	border-radius: 50%;
	margin: 0 auto;
	border: 1px solid #aaa;
	width: 3em;
	height: 3em;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	& > p {
		flex: 1;
	}
	&:hover {
		cursor: pointer;
		opacity: 0.8;
		background-color: rgba(81, 151, 213, 0.8);
	}
`;

const MyFollow = (props: Props) => {
	const { followingUsers, followers } = props;
	return (
		<section id={props.id}>
			<section>
				<h3>팔로잉 {followingUsers.length}</h3>
				<FollowContainer>
					{followingUsers.map(user => (
						<div key={user.id}>
							<Link href='/users/[id]' as={`/users/${user.id}`}>
								<a>
									<UserPhoto src={user.photo} width={3} hover />
									<p>{user.nickname}</p>
								</a>
							</Link>
						</div>
					))}
					<div>
						<Link href='/'>
							<a>
								<MoreButton>
									<AddIcon />
								</MoreButton>
								<p>더보기</p>
							</a>
						</Link>
					</div>
				</FollowContainer>
			</section>
			<section>
				<h3>팔로워 {followers.length}</h3>
				<FollowContainer>
					{followers.map(user => (
						<div key={user.id}>
							<Link href='/users/[id]' as={`/users/${user.id}`}>
								<a>
									<UserPhoto src={user.photo} width={3} hover />
									<p>{user.nickname}</p>
								</a>
							</Link>
						</div>
					))}
					<div>
						<MoreButton>
							<AddIcon />
						</MoreButton>
						<p>더보기</p>
					</div>
				</FollowContainer>
			</section>
		</section>
	);
};

export default MyFollow;
