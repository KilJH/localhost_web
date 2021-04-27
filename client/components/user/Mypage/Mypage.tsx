// import { Tab, Tabs } from '@material-ui/core';
import React, { ReactNode, useContext } from 'react';
import { User } from '../../../interfaces/index';
import MyBoard from './MyBoard';
import MyFollow from './MyFollow';
import Privacy from './Privacy';
import styled from 'styled-components';
import ScrollContext from '../../../context/scroll';
import { useMediaQuery } from '@material-ui/core';
import MypageLayout from './MypageHeader';

interface Props {
	followingUsers?: User[];
	followers?: User[];
}

const Mypage = (props: Props) => {
	return (
		<MypageLayout tabNum={1}>
			<Privacy id='pravacy' />
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
