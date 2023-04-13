import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getResultObject } from '@/lib/result.js';
import styles from './Result.module.scss';
import Column from '@/components/Highcharts/Column';
import Pie from '@/components/Highcharts/Pie';

function Result({ data }) {
	const router = useRouter();
	const [isLoad, setIsLoad] = useState(false);
	const [result, setResult] = useState(null);
	const [city, setCity] = useState(null);
	const [district, setDistrict] = useState(null);
	const [heading, setHeading] = useState(null);

	useEffect(() => {
		setHeading(router.query.slug.join(' '));

		if (router.query?.slug && router.query?.slug[1])
			setCity(router.query?.slug[1]);
		if (router.query?.slug && router.query?.slug[2])
			setDistrict(router.query?.slug[2]);
	}, [router]);

	useEffect(() => {
		setResult(getResultObject(data.responseData, city, district));
	}, [data.responseData, city, district]);

	useEffect(() => {
		setIsLoad(true);
	}, [result]);

	return (
		<div className={styles.wrapper}>
			<h2 className="t-center">{heading}</h2>
			{isLoad && result && (
				<>
					<Column
						householdOrdinaryMale={result[0].household_ordinary_m}
						householdOrdinaryFemale={result[0].household_ordinary_f}
						householdSingleMale={result[0].household_single_m}
						householdSingleFemale={result[0].household_single_f}
					/>
					<Pie
						householdOrdinaryTotal={result[0].household_ordinary_total}
						householdSingleTotal={result[0].household_single_total}
					/>
				</>
			)}
		</div>
	);
}

export async function getServerSideProps({ params }) {
	const res = await fetch(
		`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${params.slug[0]}`
	);
	const data = await res.json();

	return { props: { data } };
}

export default Result;
