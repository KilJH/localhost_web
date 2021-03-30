// import { GetStaticProps } from 'next';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components'; // styled-components SSR 제공
import { ServerStyleSheets } from '@material-ui/styles';
import { UserContextProvider } from '../context/user';

interface Props {
	styleTags: Array<React.ReactElement<{}>>;
}

// 클래스형
export default class MyDocument extends Document<Props> {
	static async getInitialProps(ctx: any) {
		const styledComponentSheet = new ServerStyleSheet();
		const materialSheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App: any) => (props: any) =>
						styledComponentSheet.collectStyles(
							materialSheets.collect(<App {...props} />)
						),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{materialSheets.getStyleElement()}
						{styledComponentSheet.getStyleElement()}
					</>
				),
			};
		} finally {
			styledComponentSheet.seal();
		}
	}
	render() {
		return (
			<Html>
				<Head>
					{/* SSR 시 styled-components가 적용되도록 함 */}
					{this.props.styleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
