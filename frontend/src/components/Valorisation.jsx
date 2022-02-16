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
import { groupByScale, sum } from '../utils/functions';

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
		<div>
			<h5>Valorisation</h5>
			<div>
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
	const reports = groupByScale(data, scale);

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
