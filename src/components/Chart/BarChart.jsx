import { useEffect } from "react";
import { useState } from "react";
import { TicketName } from "./models/chart.model";
import Chart from 'react-apexcharts';

function BarChart(props) {
    const { data, height, currentYear, maxYAxis } = props;
    const [chart, setChart] = useState({
        series: [
            {
                name: TicketName.booking,
                // data: [44, 55, 57, 56, 61, 58, 63,]
                data: [0, 0, 0, 0, 0, 0, 0,]
            },
            {
                name: TicketName.completed,
                // data: [76, 85, 101, 98, 87, 105, 91,]
                data: [0, 0, 0, 0, 0, 0, 0,]
            },
            {
                name: TicketName.canceled,
                // data: [35, 41, 36, 26, 45, 48, 52,]
                data: [0, 0, 0, 0, 0, 0, 0,]
            }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '30%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['transparent']
            },
            xaxis: {
                categories: [
                    '1-1', '2-1', '3-1', '4-1', '5-1', '6-1', '7-1',
                ],
            },
            yaxis: {
                title: {
                    text: 'Số lượng'
                },
                min: 0,
                max: maxYAxis
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " vé"
                    }
                }
            },
            title: {
                text: `Thống kê vé xe buýt theo ngày (năm ${currentYear})`,
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
            })
        }
    }, [data]);

    return (
        <Chart
            options={chart.options}
            series={chart.series}
            type='bar'
            height={height}
        />
    );
}

export default BarChart;