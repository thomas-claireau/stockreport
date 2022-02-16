import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useApiContext } from '../ApiContext';
import { groupBy } from '../utils/functions';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Distribution() {
	const { stocks } = useApiContext();

	const options = {
		plugins: {
			legend: {
				position: 'bottom',
			},
			tooltip: {
				callbacks: {
					label: function ({ formattedValue }) {
						return formattedValue + '%';
					},
				},
			},
		},
	};

	return (
		<div className="dark:bg-slate-800 p-4 flex flex-col gap-4 basis-1/3">
			<h3 className="text-lg text-slate-500">Répartition</h3>
			<Doughnut options={options} data={getDistribution(stocks)} />
		</div>
	);
}

function getDistribution(data) {
	const nbStocks = data.length;
	const stocks = groupBy(data, 'type');
	const colors = [
		'rgba(255, 99, 132, 1)',
		'rgba(54, 162, 235, 1)',
		'rgba(255, 206, 86, 1)',
		'rgba(75, 192, 192, 1)',
		'rgba(153, 102, 255, 1)',
		'rgba(255, 159, 64, 1)',
	];

	const dataset = [
		{
			label: 'Répartition',
			data: [],
			backgroundColor: [],
			borderColor: [],
			borderWidth: 1,
		},
	];

	const labels = [];

	let i = 0;

	for (const key in stocks) {
		if (Object.hasOwnProperty.call(stocks, key)) {
			dataset[0].data.push((stocks[key].length / nbStocks) * 100);

			labels.push(key);
			dataset[0].backgroundColor.push(colors[i]);
			dataset[0].borderColor.push(colors[i]);
		}

		i++;
	}

	return {
		labels,
		datasets: dataset,
	};
}
