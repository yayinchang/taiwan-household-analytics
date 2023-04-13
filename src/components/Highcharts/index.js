import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = ({ data }) => {
	const options = {
		chart: {
			type: 'column',
		},
		title: {
			text: 'Column chart with negative values',
		},
		subtitle: {
			text: `chart`,
		},
		xAxis: {
			categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
			crosshair: true,
			max: 4,
		},
		yAxis: {
			min: 0,
			title: {
				text: `chart`,
			},
			labels: {
				format: '{value:.0f} %',
			},
			tickInterval: 5,
		},
		credits: {
			enabled: false,
		},
		series: [
			{
				name: 'John',
				data: [1, 2, 3, 4, 5],
			},
			{
				name: 'Jane',
				data: [3, 5, 5, 2, 2],
			},
			{
				name: 'Joe',
				data: [5, 4, 3, 2, 1],
			},
		],
		exporting: {
			buttons: {
				contextButton: {
					menuItems: [
						'viewFullscreen',
						'printChart',
						'downloadPNG',
						'downloadSVG',
						'downloadPDF',
						'downloadJPEG',
					],
				},
			},
		},
	};

	return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
