import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useApiContext } from '../../ApiContext';
import { groupBy, sum } from '../../utils/functions';
import style from './Movement.module.scss';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
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

export default function Movement() {
	const { movements } = useApiContext();
	const [scale, setScale] = useState(localStorage.getItem('scale') || 'month');

	const transfers = movements.filter((movement) => {
		if (movement.MovementType.name == 'transfer') {
			return movement;
		}
	});

	return (
		<div className={style['Movement']}>
			{transfers.length ? (
				<Bar options={options} data={getData(transfers, scale)} />
			) : (
				<div>Aucun transfert</div>
			)}
		</div>
	);
}

function getData(data, scale) {
	const transfers = groupByScale(data, scale);

	const dataset = [
		{
			label: 'Transferts',
			backgroundColor: [],
			borderColor: [],
			borderWidth: 1,
			hoverBackgroundColor: [],
			data: [],
			fill: false,
			pointBackgroundColor: ['red'],
		},
	];

	for (const key in transfers) {
		if (Object.hasOwnProperty.call(transfers, key)) {
			const value = sum(transfers[key].map((transfer) => transfer.amount));

			dataset[0].data.push({
				x: key,
				y: value,
			});

			// set colors
			const positiveColor = '#2c8ef8';
			const negativeColor = '#fa5c7c';

			dataset[0].backgroundColor.push(
				value > 0 ? positiveColor : negativeColor
			);
			dataset[0].borderColor.push(value > 0 ? positiveColor : negativeColor);
			dataset[0].hoverBackgroundColor.push(
				value > 0 ? positiveColor : negativeColor
			);
		}
	}

	return {
		labels: [],
		datasets: dataset,
	};
}

function groupByScale(data, scale) {
	return groupBy(
		data
			.map((transfer) => {
				const scaleObj = {};

				if (scale == 'week') {
					scaleObj['day'] = '2-digit';
					scaleObj['month'] = '2-digit';
					scaleObj['year'] = '2-digit';
				} else if (scale == 'month') {
					scaleObj['month'] = '2-digit';
					scaleObj['year'] = '2-digit';
				} else {
					scaleObj['year'] = 'numeric';
				}

				return {
					...transfer,
					date: new Date(transfer.updatedAt).toLocaleString(
						'default',
						scaleObj
					),
				};
			})
			.reverse(),
		'date'
	);
}
