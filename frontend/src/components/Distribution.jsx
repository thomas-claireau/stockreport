import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useApiContext } from '../ApiContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Distribution() {
	const { stocks } = useApiContext();

	const options = {
		plugins: {
			legend: {
				position: 'bottom',
			},
		},
	};
	const data = {
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [
			{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="dark:bg-slate-800 p-4 flex flex-col gap-4 basis-1/3">
			<h3 className="text-lg text-slate-500">Répartition</h3>
			<Doughnut options={options} data={data} />
		</div>
	);
}
