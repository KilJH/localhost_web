import React, { useState } from 'react';
import GlobalStyle from '../client/styles/reset';
import App from 'next/app';
import axios from 'axios';
import SERVER from '../client/utils/url';
import { ScrollProvider } from '../context/scroll';
import { UserContextProvider } from '../context/user';

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
	const cookie = ctx.req?.headers.cookie || '';
	let loginProps = {};
	// let URL = ctx.req ? '' : SERVER;
	// SSR
	if (ctx.req) {
		axios.defaults.headers.cookie = cookie;
	}

	const res = await axios.get(`${SERVER}/api/auth/check`, {
		withCredentials: true,
	});
	const isLogined = res.data.success;
	const user = res.data.user || {};
	// const isLogined = false;
	// const user = {};
	loginProps = { isLogined, user };
	return { ...appProps, loginProps };
	// return {};
};

export default _app;
