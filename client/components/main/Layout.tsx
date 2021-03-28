import React, { ReactNode, useContext } from 'react';
import Head from 'next/head';
import Header from './Header';
import styled from 'styled-components';
import Footer from './Footer';
import { useMediaQuery } from '@material-ui/core';
import { LoginProps, User } from '../../interfaces/index';
import { ScrollProvider } from '../../context/scroll';
import { UserSetterContext, UserStateContext } from '../../context/user';

type Props = {
	children?: ReactNode;
	title?: string;
	// loginProps?: LoginProps;
};

const Main = styled.div<{ isMobile: boolean }>`
	width: ${(props) => (props.isMobile ? '100%' : '80%')};
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1em;
	transition: width 0.3s ease;
	box-sizing: border-box;
`;

const Layout = ({
	children,
	title = 'for your dream | localhost',
}: // loginProps,
Props) => {
	const isMobile = useMediaQuery('(max-width: 600px)');

	// const setUser = useContext(UserSetterContext);
	const currentUser = useContext(UserStateContext);
	// setUser(loginProps.user);

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			{/* <Header isMobile={isMobile} isLogined={loginProps.isLogined} /> */}
			<Header isMobile={isMobile} />
			<Main isMobile={isMobile}>{children}</Main>
			<footer>
				<hr />
				<Footer />
			</footer>
		</div>
	);
};

export default Layout;
