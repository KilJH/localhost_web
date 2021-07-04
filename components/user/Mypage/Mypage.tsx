// import { Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { User } from '../../../interfaces/index';
import MyFollow from './MyFollow';
import Privacy from './Privacy';
import MypageLayout from './MypageHeader';

interface Props {
	followingUsers?: User[];
	followers?: User[];
}

const Mypage = (props: Props) => {
	return (
		<MypageLayout tabNum={1}>
			<Privacy />
			<hr />
			<MyFollow
				id='follow'
				followingUsers={props.followingUsers}
				followers={props.followers}
			/>
		</MypageLayout>
	);
};

export default Mypage;
