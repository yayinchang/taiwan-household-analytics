import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCityList, getDistrictList } from '@/lib/result.js';
import cx from 'classnames';
import styles from './Search.module.scss';
import Selector from '@/components/Selector';

export default function Search({ data }) {
	const router = useRouter();
	const { push } = useRouter();
	const [responseData, setResponseData] = useState(data?.responseData);
	const yearList = ['111', '110', '109', '108', '107', '106'];
	const [year, setYear] = useState('111');
	const [city, setCity] = useState(null);
	const [district, setDistrict] = useState(null);
	const [activeSelector, setActiveSelector] = useState(null);

	useEffect(() => {
		if (router.query?.slug && router.query?.slug[0])
			setYear(router.query?.slug[0]);
		if (router.query?.slug && router.query?.slug[1])
			setCity(router.query?.slug[1]);
		if (router.query?.slug && router.query?.slug[2])
			setDistrict(router.query?.slug[2]);
	}, [router]);

	useEffect(() => {
		async function fetAPI() {
			const response = await fetch(
				`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}`
			);
			const data = await response.json();
			setResponseData(data.responseData);
		}
		fetAPI();
	}, [year]);

	return (
		<div className={cx(styles.search)}>
			<h1>人口數、戶數按戶別及性別統計</h1>
			<div className={styles.selectors}>
				<Selector
					label="年份"
					value={year}
					isActive={activeSelector === 'year'}
					onClickEvent={() => {
						activeSelector === 'year'
							? setActiveSelector(null)
							: setActiveSelector('year');
					}}
					classNames={styles.selectors__year}
				>
					{yearList.map((_year, key) => (
						<button
							key={key}
							type="button"
							className={styles.option}
							onClick={() => {
								if (_year !== year) {
									setDistrict(null);
									setCity(null);
									setYear(_year);
								}
							}}
						>
							{_year}
						</button>
					))}
				</Selector>
				<Selector
					label="縣/市"
					value={city}
					placeholder="請選擇 縣/市"
					isActive={activeSelector === 'city'}
					isDisabled={!year}
					onClickEvent={() => {
						activeSelector === 'city'
							? setActiveSelector(null)
							: setActiveSelector('city');
					}}
					classNames={styles.selectors__city}
				>
					{getCityList(responseData).map((_city, key) => (
						<button
							key={key}
							type="button"
							className={styles.option}
							onClick={() => {
								if (_city !== city) {
									setDistrict(null);
									setCity(_city);
								}
							}}
						>
							{_city}
						</button>
					))}
				</Selector>
				<Selector
					label="區"
					value={district}
					placeholder="請選擇 區"
					isActive={activeSelector === 'district'}
					isDisabled={!city}
					onClickEvent={() => {
						activeSelector === 'district'
							? setActiveSelector(null)
							: setActiveSelector('district');
					}}
					classNames={styles.selectors__district}
				>
					{getDistrictList(responseData, city)?.map((district, key) => (
						<button
							key={key}
							type="button"
							className={styles.option}
							onClick={() => setDistrict(district.replace(city, ''))}
						>
							{district.replace(city, '')}
						</button>
					))}
				</Selector>
				<button
					type="button"
					className={cx(styles.submit, {
						[styles.submit__active]: year && city && district,
					})}
					onClick={() => {
						push({ pathname: `/${year}/${city}/${district}` }, undefined);
					}}
				>
					Submit
				</button>
			</div>
			<div className={styles.divider}>
				<hr className={styles.divider__line} />
				<div className={styles.divider__label}>
					<span>搜尋結果</span>
				</div>
			</div>
		</div>
	);
}
