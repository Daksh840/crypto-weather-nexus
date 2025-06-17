'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({
  data,
  labels,
  color
}: {
  data: number[];
  labels: string[];
  color: string;
}) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: '',
            data,
            borderColor: color,
            tension: 0.4,
            fill: false
          }
        ]
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }}
    />
  );
}