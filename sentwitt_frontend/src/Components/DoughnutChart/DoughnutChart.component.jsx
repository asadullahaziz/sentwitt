import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({type, primary, other, color}) {
    const data = {
        labels: [type, "Other"],
        datasets: [
            {
                label: type + ' Sentiment',
                data: [primary, other],
                backgroundColor: [
                    color,
                    '#2A2E35'
                ],
                borderWidth: 0
            }
        ]
    };

    return <Doughnut data={data} />;
}