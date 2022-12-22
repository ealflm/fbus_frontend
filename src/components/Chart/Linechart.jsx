import { useState } from "react";
import { TicketID, TicketName } from "./models/chart.model";
import Chart from 'react-apexcharts';
import { useEffect } from "react";

function LineChart(props) {
    const { data, height, maxYAxis, currentYear } = props;
    const [options, setOptions] = useState({
        options: {
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
                text: `Thống kê vé xe buýt theo tháng (năm ${currentYear})`,
                floating: true,
                offsetY: 0,
                align: 'center',
                style: {
                    color: '#455560'
                }
            }
        }
    });
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
        options: options
    });

    useEffect(() => {
        if (data && data.length) {
            const opts = {
                ...options,
                yaxis: {
                    min: 0,
                    max: maxYAxis <= 30 ? Math.ceil(maxYAxis / 10) * 10 : Math.ceil(maxYAxis / 10) * 10 + 10
                }
            }
            setOptions(opts);
            setChart(prev => {
                return {
                    ...prev,
                    series: data,
                    options: opts
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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