import React from 'react';
import GlobalStyle from '../styles/reset';
import App, { AppContext } from 'next/app';
import axios from 'axios';
import SERVER from '../utils/url';

const _app = (props: any) => {
	const { Component, title, ...others } = props;
	return (
		<div>
			{/* 전역 css */}
			<GlobalStyle />
			<Component {...others} />
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
	const res = await axios.post(`${SERVER}/api/auth/check`, {
		token: appContext.ctx.req.cookies.token,
	});
	const isLogined = res.data.success;
	const user = res.data.user || {};
	// console.log(appContext.ctx.req.cookies.token);

	return { ...appProps, isLogined, user };
};

export default _app;
