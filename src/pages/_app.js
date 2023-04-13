import '@/styles/index.scss';
import Layout from '@/layout';

export default function App({ Component, pageProps }) {
	return (
		<Layout data={pageProps.data}>
			<Component {...pageProps} />
		</Layout>
	);
}
