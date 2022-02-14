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
	responsive: true,
	plugins: {
		title: {
			display: true,
			text: 'Chart.js Bar Chart',
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
};

export default function Movement() {
	const { movements } = useApiContext();
	const [scale, setScale] = useState(
		localStorage.getItem('scale') || 'weekday'
	);

	const now = new Date();

	switch (scale) {
		case 'weekday':
			now.setDate(now.getDate() - 7);
			break;
		default:
			break;
	}

	const transfers = movements.filter((movement) => {
		if (
			movement.MovementType.name == 'transfer' &&
			new Date(movement.updatedAt) > now
		) {
			return movement;
		}
	});

	console.log(getData(transfers, scale));

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
	const transfers = groupBy(
		data.map((transfer) => {
			const scaleObj = {};
			scaleObj[scale] = 'long';

			return {
				...transfer,
				updatedAt: new Date(transfer.updatedAt).toLocaleString(
					'default',
					scaleObj
				),
			};
		}),
		'updatedAt'
	);

	const dataset = [
		{
			label: 'Transferts',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			data: [],
		},
	];

	Object.values(transfers).forEach((transfers) => {
		dataset[0].data.push(sum(transfers.map((transfer) => transfer.amount)));
	});

	return {
		labels: Object.keys(transfers),
		datasets: dataset,
	};
}
