import React from 'react';

function Result({ data }) {
	return <></>;
}

export async function getServerSideProps({ params }) {
	const res = await fetch(
		`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${params.slug[0]}`
	);
	const data = await res.json();

	return { props: { data } };
}

export default Result;
