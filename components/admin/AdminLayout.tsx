import React, { ReactNode, useContext, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Footer from '../main/Footer';
import AdminHeader from './AdminHeader';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AdminNav from './AdminNav';
import ScrollContext from '../../context/scroll';
import checkScrollDirection from '../../client/utils/checkScrollDirection';

type Props = {
	title: string;
	children?: ReactNode;
	selected?: string;
};

interface MobileProps {
	isMobile: boolean;
}
const Layout = styled.div`
	max-width: 1200px;
	display: block;
	margin: 0 auto;
	min-height: 27em;
	align-items: center;
`;
const ComponentDiv = styled.div<MobileProps>`
	width: 100%;
	margin: 0;
	background-color: #f1f2f6;
	height: 100%;
	min-height: 100vh;
	padding-top: ${props => (props.isMobile ? '5em' : '0')};
`;

const TitleDiv = styled.div`
	margin: 0 0 0 1.75em;
`;
const Title = styled.h4<MobileProps>`
	margin: 0 2em;
	padding-left: ${props => (props.isMobile ? '1em' : '11em')};
	padding-top: 3.5em;
	font-size: 1.1em;
	color: #5197d5;
`;
const MainComponent = styled.div<MobileProps>`
	margin: ${props => (props.isMobile ? '1em 3em 3em 3em' : '1em 3em 3em 15em')};
	padding: 2em;
	top: -4em;
	background-color: white;
	border-radius: 0.25em;
	box-shadow: 2px 2px 5px 1px gray;
	& div {
		& form > div {
			&.MuiFormControl-root {
				height: ${props => (props.isMobile ? '6em' : '')};
			}
		}
		& div > div > button {
			&.MuiButton-containedPrimary {
				float: ${props => (props.isMobile ? 'left' : '')};
			}
		}
	}
`;
const FooterDiv = styled.footer`
	text-align: center;
	font-size: 0.8rem;
	position: sticky;
	z-index: 2;
	border-top: 1px solid #ddd;
	background: white;
	padding: 1.25em;
`;
export default function AdminLayout(props: Props) {
	const {
		title = '오류동에서 오류남! | 관리자 | localhost',
		children,
		selected,
	} = props;

	const { state, actions } = useContext(ScrollContext);
	const isMobile = useMediaQuery('(max-width: 860px)');
	const onScroll = () => {
		actions.setIsUp(checkScrollDirection());
	};

	useEffect(() => {
		document.addEventListener('scroll', onScroll);
		return () => {
			document.removeEventListener('scroll', onScroll);
		};
	}, []);
	return (
		<div>
			<Head>
				<title>{title} | 관리자 | localhost</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<AdminHeader
				isUp={state.isUp}
				isMobile={isMobile}
				selected={selected as string}
			/>
			<Layout>
				{isMobile || <AdminNav selected={selected} />}
				<ComponentDiv isMobile={isMobile}>
					<TitleDiv>
						<Title isMobile={isMobile}>{title}</Title>
					</TitleDiv>
					<MainComponent isMobile={isMobile}>{children}</MainComponent>
				</ComponentDiv>
				<FooterDiv>
					<Footer />
				</FooterDiv>
			</Layout>
		</div>
	);
}
