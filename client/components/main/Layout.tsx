import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import styled from 'styled-components';
import Footer from './Footer';
import { useMediaQuery } from '@material-ui/core';
import { User } from '../../interfaces/index';

type Props = {
	children?: ReactNode;
	title?: string;
	isLogined: boolean;
	user?: User;
};

const Main = styled.div<{ isMobile: boolean }>`
	width: ${(props) => (props.isMobile ? '100%' : '70%')};
	margin: 0 auto;
	padding: 0 1em;
	transition: width 0.3s ease;
	box-sizing: border-box;
`;

const Layout = ({
	children,
	title = 'for your dream | localhost',
	isLogined,
	user,
}: Props) => {
	const isMobile = useMediaQuery('(max-width: 600px)');

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Header isMobile={isMobile} isLogined={isLogined} user={user} />
			<Main isMobile={isMobile}>{children}</Main>
			<footer>
				<hr />
				<Footer />
			</footer>
		</div>
	);
};

export default Layout;
