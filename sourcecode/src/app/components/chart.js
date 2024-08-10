import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ data }) => {
    const chartData = {
      labels: ['Positive Days', 'Negative Days'],
      datasets: [
        {
          label: '# of Days',
          data: [data.positiveDays, data.negativeDays], // Example data
          backgroundColor: [
            '#53d457', // Greenish shade for Positive Days
          '#d15252',
          ],
          borderColor: [
            '#3e9c41', // Greenish shade for Positive Days
          '#b04545',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    return <div style={{ width: '300px', height: '300px' }}>
    <Pie data={chartData} />
  </div>;
  };
  