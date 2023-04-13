import React from 'react';

function Home() {
	return <></>;
}

export async function getServerSideProps() {
	const res = await fetch(
		`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/111`
	);
	const data = await res.json();

	return { props: { data } };
}

export default Home;
