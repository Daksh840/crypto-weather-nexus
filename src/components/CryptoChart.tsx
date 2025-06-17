// components/CryptoChart.tsx
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
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/reducers/store';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CryptoChartProps {
  data: number[];
  labels: string[];
  color?: string;
}

const CryptoChart = ({ data, labels, color = '#4f46e5' }: CryptoChartProps) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const { darkMode } = useAppSelector((state: RootState) => state.preferences);

  useEffect(() => {
    setCurrentTheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Price',
        data,
        borderColor: color,
        backgroundColor: `${color}20`,
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
        bodyColor: currentTheme === 'dark' ? '#e5e7eb' : '#374151',
        titleColor: currentTheme === 'dark' ? '#9ca3af' : '#6b7280',
        borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: currentTheme === 'dark' ? '#374151' : '#e5e7eb',
        },
        ticks: {
          color: currentTheme === 'dark' ? '#9ca3af' : '#6b7280',
        },
      },
      y: {
        grid: {
          color: currentTheme === 'dark' ? '#374151' : '#e5e7eb',
        },
        ticks: {
          color: currentTheme === 'dark' ? '#9ca3af' : '#6b7280',
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-64">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Price History (7 Days)
      </h3>
      <div className="h-48">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CryptoChart;