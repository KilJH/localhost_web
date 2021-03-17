/* eslint-disable jsx-a11y/anchor-is-valid */
import { Drawer, IconButton } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import PersonIcon from '@material-ui/icons/Person';
import Link from 'next/link';
// Mobile
import MenuIcon from '@material-ui/icons/Menu';
import { useDrawer } from '../../hooks/useDrawer';
import CloseIcon from '@material-ui/icons/Close';
import Login from '../user/Login';

interface Props {
	isMobile: boolean;
}

interface HeaderStyleProps {
	isMobile: boolean;
}

const menuArray = [
	{ name: '플랜보기', path: '/plans' },
	{ name: '동행찾기', path: '/host' },
	{ name: '공지사항', path: '/notice' },
	{ name: '소개', path: '/about' },
	{ name: '문의하기', path: '/question' },
	{ name: '유저보기', path: '/users' },
];

const HeaderDiv = styled.div<HeaderStyleProps>`
	width: 100%;
	height: 8vh;
	min-height: 2.5rem;
	max-height: 4rem;
	padding: ${(props) => (props.isMobile ? 0 : '0 15%')};
	box-sizing: border-box;

	background: white;
	position: sticky;
	top: 0;

	display: flex;
	align-items: center;

	z-index: 10;

	/* transition: padding 0.3s ease; */

	& > button {
		width: 2.5rem;
		height: 2.5rem;
	}
`;

const Logo = styled.div`
	height: 100%;
	max-height: 3.5rem;
	cursor: pointer;
	transition: opacity ease 0.3s;

	box-sizing: border-box;
	padding: 0.25rem 0;

	& > a > img {
		height: 100%;
		display: block;
		margin: auto;
	}

	&:hover {
		opacity: 65%;
	}
`;

const MainMenu = styled.div`
	flex: 1;
	height: 100%;
	width: 100px;

	& > nav {
		height: 100%;
		& > ul {
			list-style: none;
			height: 100%;
			margin: 0;
			padding-left: 2rem;
			white-space: nowrap;
			overflow-x: auto;

			display: flex;

			/* 스크롤 안보이기 */
			-ms-overflow-style: none; /* IE and Edge */
			scrollbar-width: none; /* Firefox */
			&::-webkit-scrollbar {
				display: none; /* Chrome, Safari, Opera*/
			}

			& > li {
				height: 100%;
				padding: 0 1rem;
				display: flex;
				align-items: center;
				transition: all ease 0.3s;
				box-sizing: border-box;
				box-shadow: inset 0 0px white;

				& a {
					display: block;
				}
				&:hover {
					background: rgba(81, 151, 213, 0.1);
					/* background: linear-gradient(white, 80%, rgba(81, 151, 213, 0.1)); */
					box-shadow: inset 0 -2px #5197d5;
				}
			}
		}
	}
`;

const HamburgerMenu = styled.div`
	width: 12rem;
	& ul {
		list-style: none;
		padding: 0;
		& > li {
			padding: 0.5rem 2rem;

			& a {
				display: block;
				font-size: 1rem;
			}
			&:hover {
				background: rgba(81, 151, 213, 0.1);
			}
		}
	}
`;

const EmptyFlexDiv = styled.div`
	flex: 1;
`;

const Menu = () => (
	<nav>
		<ul>
			{menuArray.map((menu) => (
				<li key={menu.name}>
					<Link href={menu.path}>
						<a>{menu.name}</a>
					</Link>
				</li>
			))}
		</ul>
	</nav>
);

const LoginMenu = () => {
	const loginDrawer = useDrawer('right');

	return (
		<>
			<IconButton onClick={loginDrawer.onOpen}>
				<PersonIcon />
			</IconButton>
			<Drawer
				anchor={loginDrawer.anchor}
				open={loginDrawer.open}
				onClose={loginDrawer.onClose}
			>
				<Login />
			</Drawer>
		</>
	);
};

const Header = (props: Props) => {
	const drawer = useDrawer('left');

	if (props.isMobile) {
		return (
			<HeaderDiv isMobile={props.isMobile}>
				<IconButton>
					<MenuIcon onClick={drawer.onOpen} />
				</IconButton>
				<Drawer
					anchor={drawer.anchor}
					open={drawer.open}
					onClose={drawer.onClose}
				>
					<HamburgerMenu>
						<div>
							<EmptyFlexDiv />
							<IconButton>
								<CloseIcon onClick={drawer.onClose} />
							</IconButton>
						</div>
						<Menu />
					</HamburgerMenu>
				</Drawer>
				<EmptyFlexDiv />
				<Logo>
					<Link href="/">
						<a>
							<img alt="mainlogo" src="/img/logos/localhostLogoBlack.png"></img>
						</a>
					</Link>
				</Logo>
				<EmptyFlexDiv />
				<LoginMenu />
			</HeaderDiv>
		);
	} else {
		return (
			<HeaderDiv isMobile={props.isMobile}>
				<Logo>
					<Link href="/">
						<a>
							<img alt="mainlogo" src="/img/logos/localhostLogoBlack.png"></img>
						</a>
					</Link>
				</Logo>

				<MainMenu>
					<Menu />
				</MainMenu>
				<div>
					<input placeholder="검색창" />
				</div>
				<LoginMenu />
			</HeaderDiv>
		);
	}
};

export default Header;
