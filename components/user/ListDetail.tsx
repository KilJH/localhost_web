import * as React from 'react';

import { User } from '../../interfaces';
import FollowButton from './FollowButton';

type ListDetailProps = {
	item: User;
	isFollowed: boolean;
};

const ListDetail = ({ item: user, isFollowed }: ListDetailProps) => (
	<div>
		<h1>Detail for {user.name}</h1>
		<p>ID: {user.id}</p>
		<FollowButton userId={user.id!} initialFollowed={isFollowed} />
	</div>
);

export default ListDetail;
