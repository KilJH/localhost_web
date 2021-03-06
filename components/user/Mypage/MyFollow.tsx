import React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import { User } from '../../../interfaces/index';
import UserPhoto from '../UserPhoto';
import Link from 'next/link';

interface Props {
	id: string;
	followingUsers: User[];
	followers: User[];
}

const FollowContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	& > div {
		width: 5rem;
		text-align: center;
		overflow: hidden;
		margin: 0.5em 0.125em;
		& p {
			margin: 0.25em auto;
			height: 1em;
			white-space: nowrap;
		}
	}
`;

const MoreButtonContainer = styled.div`
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

const FollowItem = ({ user }) => (
	<div key={user.id}>
		<Link href='/users/[id]' as={`/users/${user.id}`}>
			<a>
				<UserPhoto src={user.photo} width={3} hover />
				<p>{user.nickname}</p>
			</a>
		</Link>
	</div>
);

const MoreButton = ({ href }) => (
	<div>
		<Link href={href}>
			<a>
				<MoreButtonContainer>
					<AddIcon />
				</MoreButtonContainer>
				<p>더보기</p>
			</a>
		</Link>
	</div>
);

const MyFollow = (props: Props) => {
	const { followingUsers, followers } = props;

	return (
		<section id={props.id}>
			<section>
				<h3>팔로잉 {followingUsers.length}</h3>
				<FollowContainer>
					{followingUsers.slice(0, 10).map(user => (
						<FollowItem user={user} key={user.id} />
					))}
					{followingUsers.length > 10 && <MoreButton href='/' />}
				</FollowContainer>
			</section>
			<section>
				<h3>팔로워 {followers.length}</h3>
				<FollowContainer>
					{followers.slice(0, 10).map(user => (
						<FollowItem user={user} key={user.id} />
					))}
					{followers.length > 10 && <MoreButton href='/' />}
				</FollowContainer>
			</section>
		</section>
	);
};

MyFollow.defaultProps = {
	followingUsers: [],
	followers: [],
};

export default MyFollow;
