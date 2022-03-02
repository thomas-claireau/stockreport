import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useApiContext } from '../ApiContext';
import { groupBy } from '../utils/functions';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Distribution({ className }) {
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
    maintainAspectRatio: false,
  };

  return (
    <div className={`${className} dark:bg-slate-800 p-4 flex flex-col gap-4`}>
      <h3 className="text-sm sm:text-lg text-slate-500">Répartition</h3>
      <div className="mt-4 h-72 sm:h-full">
        <Doughnut options={options} data={getDistribution(stocks)} />
      </div>
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
