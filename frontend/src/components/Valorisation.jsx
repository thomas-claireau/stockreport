import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useApiContext } from '../ApiContext';
import { groupByDate, sum } from '../utils/functions';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	plugins: {
		title: {
			display: false,
		},
		legend: {
			display: false,
		},
		tooltip: {
			callbacks: {
				label: function ({ formattedValue }) {
					return formattedValue + '€';
				},
			},
		},
	},
	scales: {
		x: {
			stacked: true,
		},
		y: {
			stacked: true,
		},
	},
	maintainAspectRatio: false,
};

export default function Valorisation() {
	const { reports } = useApiContext();
	const [scale, setScale] = useState(localStorage.getItem('scale') || 'month');

	return (
		<div className="dark:bg-slate-800 p-4 flex flex-col gap-4 basis-2/3">
			<h3 className="text-lg text-slate-500">Valorisation</h3>
			<div className="mt-4 h-full">
				{reports.length ? (
					<Line options={options} data={getValorisation(reports, scale)} />
				) : (
					<div>Aucun transfert</div>
				)}
			</div>
		</div>
	);
}

/**
 * Calcul valorisation PRU = (Somme actifs en cours) - (Somme actifs à l'achat)
 */
function getValorisation(data, scale) {
	const reports = groupByDate(data, scale);

	const dataset = [
		{
			label: 'Valorisation',
			backgroundColor: '#2c8ff814',
			borderColor: '#2c8ef8',
			borderWidth: 2,
			pointBorderWidth: 4,
			hoverBackgroundColor: '#2c8ef8',
			data: [],
			lineTension: 0.4,
		},
	];

	for (const key in reports) {
		if (Object.hasOwnProperty.call(reports, key)) {
			const live = sum(
				reports[key].map((report) => report.amount.euro * report.Stock.qty)
			);
			const pru = sum(
				reports[key].map(
					(report) => report.Stock.pru.euro * report.Stock.qty
				)
			);

			const value = live - pru;

			dataset[0].data.push({
				x: key,
				y: value.toFixed(2),
			});
		}
	}

	return {
		labels: [],
		datasets: dataset,
	};
}
