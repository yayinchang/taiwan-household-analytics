import React from 'react';

import Search from '@/components/Search';

function Result({ data }) {
	return <Search data={data} />;
}

export async function getServerSideProps({ params }) {
	const res = await fetch(
		`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${params.slug[0]}`
	);
	const data = await res.json();

	return { props: { data } };
}

export default Result;
