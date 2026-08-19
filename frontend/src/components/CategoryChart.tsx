import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import type { Transaction } from "../types/Transaction";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface CategoryChartProps {
  transactions: Transaction[];
}

function CategoryChart({ transactions }: CategoryChartProps) {
  const categoryTotals: Record<string, number> = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  const colors = ["#6ee7b7", "#c4b5fd", "#fdba8c", "#f9a8d4", "#fcd34d"];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((_, i) => colors[i % colors.length]),
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.paarsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { display: false },
    },
  };
  return (
    <div className="border border-gray-100 rounded-2xl p-5 shadow-sm">
      <h2 className="font-bold text-gray-900 mb-4">Spending by category</h2>
      {labels.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">
          No spending data yet
        </p>
      ) : (
        <Bar data={data} options={options} height={180} />
      )}
    </div>
  );
}

export default CategoryChart;
