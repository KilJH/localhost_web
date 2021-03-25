import * as React from 'react';

import { User } from '../../interfaces';
import FollowButton from './FollowButton';

type ListDetailProps = {
	loginedUser: User;
	item: User;
	isFollowed: boolean;
};

const ListDetail = ({
	item: user,
	isFollowed,
	loginedUser,
}: ListDetailProps) => (
	<div>
		<h1>Detail for {user.name}</h1>
		<p>ID: {user.id}</p>
		<FollowButton userId={user.id} isFollowed={isFollowed} user={loginedUser} />
	</div>
);

export default ListDetail;
