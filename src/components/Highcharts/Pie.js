/* eslint-disable react/jsx-filename-extension */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import classes from './Households.module.scss';

const options = (numOrdinary, numSingle) => {
	const options = {
		chart: {
			type: 'pie',
			backgroundColor: null,
		},
		title: {
			text: '戶數統計',
		},
		tooltip: {
			valueSuffix: '%',
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '{point.name}: {point.percentage:.1f}%',
				},
				showInLegend: true,
			},
		},
		credits: {
			enabled: false,
		},
		series: [
			{
				name: 'Percentage',
				colorByPoint: true,
				data: [
					{
						name: '共同生活',
						y: numOrdinary,
						color: '#626EB2',
						dataLabels: {
							color: '#000',
						},
					},
					{
						name: '獨立生活',
						y: numSingle,
						color: '#A3B1FF',
						dataLabels: {
							color: '#000',
						},
					},
				],
			},
		],
	};
	return options;
};

function Pie({ householdOrdinaryTotal = 0, householdSingleTotal = 0 }) {
	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={options(householdOrdinaryTotal, householdSingleTotal)}
		/>
	);
}

export default Pie;
