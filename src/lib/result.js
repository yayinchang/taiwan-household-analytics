export function getSiteList(data) {
	const result = [];

	data.forEach((item) => {
		if (!result.includes(item.site_id)) {
			result.push(item.site_id);
		}
	});

	return result;
}

export function getCityList(data) {
	const siteList = getSiteList(data);
	const result = [];

	siteList.forEach((site) => {
		if (!result.includes(site.slice(0, 3))) {
			result.push(site.slice(0, 3));
		}
	});

	return result;
}

export function getDistrictList(data, city) {
	const siteList = getSiteList(data);
	const districtList = siteList.filter((site) => site.includes(city));
	const result = districtList.map((district) => district.replace(city, ''));

	return result;
}

export function getResultObject(data) {
	const siteList = getSiteList(data);
	const cityList = getCityList(data);
	const result = [];

	cityList.forEach((city) => {
		const cityObj = Object.create({});
		cityObj.city = city;
		cityObj.districtList = siteList.filter((item) => item.includes(city));
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

			data.forEach((item) => {
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
					districtObj.household_single_m += parseInt(item.household_single_m);
					districtObj.household_single_f += parseInt(item.household_single_f);
				}
			});

			cityObj.districts.push(districtObj);
		});

		result.push(cityObj);
	});

	return result;
}
