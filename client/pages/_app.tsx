import React, { useContext, useEffect, useState } from 'react';
import GlobalStyle from '../styles/reset';
import App, { AppContext } from 'next/app';
import axios from 'axios';
import SERVER from '../utils/url';
import { ScrollProvider } from '../context/scroll';
import { UserContextProvider } from '../context/user';
import { useAsync } from 'react-async';

const getCurrentUser = async () => {
	const res = await axios.get(`${SERVER}/api/auth/check`, {
		withCredentials: true,
	});
	return res.data;
};

const _app = (props: any) => {
	const { Component, title, ...others } = props;

	// const setUser = useContext(UserSetterContext);
	// setUser(props.loginProps.user);
	// console.log('실행...');

	const [user, setUser] = useState(props.loginProps.user);

	return (
		<div>
			{/* 전역 css */}
			<UserContextProvider value={{ user, setUser }}>
				<ScrollProvider>
					<GlobalStyle />
					<Component {...others} />
				</ScrollProvider>
			</UserContextProvider>
		</div>
	);
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
_app.getInitialProps = async (appContext: any) => {
	// calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(appContext);
	const { ctx } = appContext;
	const cookie = ctx.req.headers.cookie || '';
	let loginProps = {};
	// SSR
	if (ctx.isServer) {
		console.log('서버에서 동작합니다.');
		axios.defaults.headers.cookie = cookie;
	}
	const res = await axios.get(`${SERVER}/api/auth/check`, {
		withCredentials: true,
		headers: {
			cookie,
		},
	});
	const isLogined = res.data.success;
	const user = res.data.user || {};
	loginProps = { isLogined, user };
	return { ...appProps, loginProps };
};

export default _app;
