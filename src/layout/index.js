import { Noto_Sans_TC } from 'next/font/google';
import Head from 'next/head';
import Header from './Header';
import Sidebar from './Sidebar';

const notoSansTC = Noto_Sans_TC({
	weight: ['300', '400', '700'],
	variable: '--font-noto-sans-tc',
	preload: false,
});

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="format-detection" content="telephone=no" />
				<link rel="icon" href="/favicon.ico" />
				<title>人口數、戶數按戶別及性別統計</title>
				<meta name="description" content="人口數、戶數按戶別及性別統計" />
			</Head>
			<div className={`main-wrapper ${notoSansTC.className}`}>
				<Header />
				<Sidebar />
				<main>{children}</main>
			</div>
		</>
	);
}
