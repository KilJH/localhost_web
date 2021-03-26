// import { Tab, Tabs } from '@material-ui/core';
import React, { ReactNode, useContext } from 'react';
import { User } from '../../interfaces/index';
import MyBoard from './Mypage/MyBoard';
import MyFollow from './Mypage/MyFollow';
import Privacy from './Mypage/Privacy';
import styled from 'styled-components';
import ScrollContext from '../../context/scroll';
import { useMediaQuery } from '@material-ui/core';

interface Props {
	user: User;
	firstTap?: number;
}

interface TabsProps {
	fixed: boolean;
	isMobile: boolean;
}
const Tabs = styled.div<TabsProps>`
	display: flex;
	position: sticky;
	background-color: white;
	top: ${(props) =>
		props.fixed ? (props.isMobile ? '2.5rem' : '4rem') : '-4rem'};
	z-index: 2;
	text-align: center;

	transition: top 0.5s ease;

	& > * {
		flex: 1;
		padding: 1em 0.5em;
		transition: all 0.3s ease;
		border-bottom: 2px solid #fff;
		&:hover {
			background-color: rgba(81, 151, 213, 0.1);
			border-bottom: 2px solid #5197d5;
		}
	}
`;

const MyPageContainer = styled.div`
	& > hr {
		margin: 4rem 0;
	}
`;

const Mypage = (props: Props) => {
	const { state } = useContext(ScrollContext);

	const isMobile = useMediaQuery('(max-width: 600px)');

	return (
		<MyPageContainer>
			<Tabs fixed={state.isUp} isMobile={isMobile}>
				<a href='#'>회원정보</a>
				<a href='#follow'>팔로우</a>
				<a href='#board'>내가 쓴 글</a>
				<a href='#wishlist'>위시리스트</a>
			</Tabs>

			<Privacy user={props.user} id='pravacy' />
			<hr />
			<MyFollow id='follow' />
			<hr />
			<MyBoard id='board' />
		</MyPageContainer>
	);
};

export default Mypage;
