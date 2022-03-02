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
import { useApiContext } from '../ApiContext';
import { groupByDate, sum } from '../utils/functions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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

export default function Movement({ className }) {
  const { movements } = useApiContext();
  const [scale, setScale] = useState(localStorage.getItem('scale') || 'month');

  const transfers = movements.filter(movement => {
    if (movement.MovementType.name == 'transfer') {
      return movement;
    }
  });

  return (
    <div className={`${className} dark:bg-slate-800 p-4 flex flex-col`}>
      <h3 className="text-sm sm:text-lg text-slate-500">Transfers</h3>
      <div className="mt-4 h-full">
        {transfers.length ? (
          <Bar options={options} data={getData(transfers, scale)} />
        ) : (
          <div>Aucun transfert</div>
        )}
      </div>
    </div>
  );
}

function getData(data, scale) {
  const transfers = groupByDate(data, scale);

  const dataset = [
    {
      label: 'Transferts',
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
      hoverBackgroundColor: [],
      data: [],
    },
  ];

  for (const key in transfers) {
    if (Object.hasOwnProperty.call(transfers, key)) {
      const value = sum(
        transfers[key].map(transfer => transfer.amount.euro),
      ).toFixed(2);

      dataset[0].data.push({
        x: key,
        y: value,
      });

      // set colors
      const positiveColor = '#2c8ef8';
      const negativeColor = '#fa5c7c';

      dataset[0].backgroundColor.push(
        value > 0 ? positiveColor : negativeColor,
      );
      dataset[0].borderColor.push(value > 0 ? positiveColor : negativeColor);
      dataset[0].hoverBackgroundColor.push(
        value > 0 ? positiveColor : negativeColor,
      );
    }
  }

  return {
    labels: [],
    datasets: dataset,
  };
}
