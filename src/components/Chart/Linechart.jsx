import { useState } from "react";
import { TicketID, TicketName } from "./models/chart.model";
import Chart from 'react-apexcharts';
import { useEffect } from "react";

function LineChart(props) {
    const { data, height, maxYAxis } = props;
    const [chart, setChart] = useState({
        series: [
            {
                id: TicketID.booking,
                name: TicketName.booking,
                // data: [40, 70, 20, 90, 36, 80, 30, 91, 60, 50, 40, 65],
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                id: TicketID.completed,
                name: TicketName.completed,
                // data: [35, 60, 15, 80, 30, 70, 25, 89, 55, 50, 40, 35],
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                id: TicketID.canceled,
                name: TicketName.canceled,
                // data: [3, 6, 5, 4, 9, 2, 7, 3, 4, 5, 6, 3],
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        ],
        options: {
            color: ['#6ab04c', '#2980b9'],
            chart: {
                background: 'transparent',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ],
            },
            yaxis: {
                min: 0,
                max: maxYAxis
            },
            legend: {
                position: 'bottom',
                horizontalAlign: "center"
            },
            grid: {
                show: false,
            },
            title: {
                text: `Thống kê vé xe buýt theo ngày `,
                floating: true,
                offsetY: 0,
                align: 'center',
                style: {
                    color: '#455560'
                }
            }
        },
    });

    useEffect(() => {
        if (data && data.length) {
            setChart(prev => {
                return {
                    ...prev,
                    series: data
                }
            });
        }
    }, [data]);

    return (
        <Chart
            options={chart.options}
            series={chart.series}
            type='line'
            height={height}
        />
    );
}

export default LineChart;