import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import styles from './Search.module.scss';

import Selector from '@/components/Selector';

export default function Search({ data }) {
	const router = useRouter();
	const { push } = useRouter();
	const yearList = ['111', '110', '109', '108', '107', '106'];
	const [rawData, setRawData] = useState(data);
	const [filterData, setFilterData] = useState([]);
	const [cityList, setCityList] = useState([]);
	const [districtList, setDistrictList] = useState([]);

	const [year, setYear] = useState('111');
	const [city, setCity] = useState(null);
	const [district, setDistrict] = useState(null);
	const [activeSelector, setActiveSelector] = useState(null);

	useEffect(() => {
		if (router.query?.slug && router.query?.slug[1])
			setCity(router.query?.slug[1]);
		if (router.query?.slug && router.query?.slug[2])
			setDistrict(router.query?.slug[2]);
	}, [router]);

	useEffect(() => {
		const _filterResult = [];
		const _cityList = [];
		const _data = [];

		if (rawData) {
			console.log('🚀 ~ file: index.js:37 ~ useEffect ~ rawData:', rawData);
			rawData.responseData.forEach((item) => {
				if (!_filterResult.includes(item.site_id)) {
					_filterResult.push(item.site_id);
				}
			});

			_filterResult.forEach((item) => {
				if (!_cityList.includes(item.slice(0, 3))) {
					_cityList.push(item.slice(0, 3));
				}
			});
			setCityList(_cityList);

			_cityList.forEach((city) => {
				const cityObj = Object.create({});
				cityObj.city = city;
				cityObj.districtList = _filterResult.filter((item) =>
					item.includes(city)
				);
				cityObj.districts = [];

				cityObj.districtList.forEach((district) => {
					const districtObj = Object.create({});
					districtObj.district = district;
					districtObj.household_ordinary_total = 0;
					districtObj.household_ordinary_m = 0;
					districtObj.household_ordinary_f = 0;
					districtObj.household_single_total = 0;
					districtObj.household_single_m = 0;
					districtObj.household_single_f = 0;

					rawData.responseData.forEach((item) => {
						if (item.site_id.includes(district)) {
							districtObj.household_ordinary_total += parseInt(
								item.household_ordinary_total
							);
							districtObj.household_ordinary_m += parseInt(
								item.household_ordinary_m
							);
							districtObj.household_ordinary_f += parseInt(
								item.household_ordinary_f
							);
							districtObj.household_single_total += parseInt(
								item.household_single_total
							);
							districtObj.household_single_m += parseInt(
								item.household_single_m
							);
							districtObj.household_single_f += parseInt(
								item.household_single_f
							);
						}
					});

					cityObj.districts.push(districtObj);
				});

				_data.push(cityObj);
			});

			console.log(_data);
			setFilterData(_data);
		}
	}, [rawData]);

	useEffect(() => {
		const activeDistrictList = filterData.filter((item) => item.city === city);
		setDistrictList(activeDistrictList[0]?.districtList);
	}, [filterData, city]);

	useEffect(() => {
		async function updateYear() {
			const response = await fetch(
				`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}`
			);
			const data = await response.json();
			setRawData(data);
		}

		updateYear();
	}, [year]);

	const handleSelectYear = (selectYear) => {
		if (selectYear !== year) {
			setYear(selectYear);
			setCity(null);
			setDistrict(null);
		}
	};

	const handleSelectCity = (selectCity) => {
		if (selectCity !== city) {
			setCity(selectCity);
			setDistrict(null);
		}
	};

	return (
		<div className={cx(styles.search, 'c')}>
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
					{yearList.map((year, key) => (
						<button
							key={key}
							type="button"
							onClick={() => handleSelectYear(year)}
						>
							{year}
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
					{cityList.map((city, key) => (
						<button
							key={key}
							type="button"
							onClick={() => handleSelectCity(city)}
						>
							{city}
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
					{districtList?.map((district, key) => (
						<button
							key={key}
							type="button"
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
