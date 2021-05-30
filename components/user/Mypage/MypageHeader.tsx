// import { Tab, Tabs } from '@material-ui/core';
import React, { ReactNode, useContext } from 'react';
import styled from 'styled-components';
import ScrollContext from '../../../context/scroll';
import { useMediaQuery } from '@material-ui/core';
import Link from 'next/link';

interface Props {
	children?: ReactNode;
	tabNum?: number;
}

interface TabsProps {
	fixed: boolean;
	isMobile: boolean;
	tabNum?: number;
}
const Tabs = styled.div<TabsProps>`
	display: flex;
	position: sticky;
	background-color: white;
	top: ${props =>
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
		&:nth-child(${props => props.tabNum || 1}) {
			background-color: rgba(81, 151, 213, 0.1);
			border-bottom: 2px solid #5197d5;
		}
	}
`;

const MyPageContainer = styled.div`
	margin: 2rem 0 3rem 0;
	& hr {
		margin: 3rem 0;
	}
`;

const MypageLayout = (props: Props) => {
	const { state } = useContext(ScrollContext);
	const { tabNum, children } = props;

	const isMobile = useMediaQuery('(max-width: 600px)');

	return (
		<>
			<Tabs fixed={state.isUp} isMobile={isMobile} tabNum={tabNum}>
				<Link href='/users/mypage'>
					<a>회원정보</a>
				</Link>
				<Link href='/users/mypage/host'>
					<a>호스트</a>
				</Link>
				<Link href='/users/mypage/plan'>
					<a>플랜</a>
				</Link>
				<Link href='#wishlist'>
					<a>위시리스트</a>
				</Link>
			</Tabs>

			<MyPageContainer>{children}</MyPageContainer>
		</>
	);
};

export default MypageLayout;
