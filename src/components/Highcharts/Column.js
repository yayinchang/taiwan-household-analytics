import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = (numOrdinaryM, numOrdinaryF, numSingleM, numSingleF) => {
	const options = {
		chart: {
			type: 'column',
			backgroundColor: null,
		},
		title: {
			text: '人口數統計',
		},
		xAxis: {
			categories: ['共同生活', '獨立生活'],
			title: {
				text: '型態',
				style: {
					fontWeight: 700,
					color: '#000',
				},
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: '數量',
				rotation: 0,
				align: 'high',
				y: -30,
				x: 35,
				style: {
					fontWeight: 700,
				},
			},
			labels: {
				format: '{value:.0f}k',
			},
			tickInterval: 25,
		},
		credits: {
			enabled: false,
		},
		series: [
			{
				name: '男性',
				data: [numOrdinaryM / 1000, numSingleM / 1000],
				color: '#7D5FB2',
				dataLabels: {
					enabled: true,
					format: '{y}', // 顯示數字格式
					color: '#000',
				},
			},
			{
				name: '女性',
				data: [numOrdinaryF / 1000, numSingleF / 1000],
				color: '#C29FFF',
				dataLabels: {
					enabled: true,
					format: '{y}', // 顯示數字格式
					color: '#000',
				},
			},
		],
	};
	return options;
};

const Column = ({
	householdOrdinaryMale = 0,
	householdOrdinaryFemale = 0,
	householdSingleMale = 0,
	householdSingleFemale = 0,
}) => {
	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={options(
				householdOrdinaryMale,
				householdOrdinaryFemale,
				householdSingleMale,
				householdSingleFemale
			)}
		/>
	);
};

export default Column;
