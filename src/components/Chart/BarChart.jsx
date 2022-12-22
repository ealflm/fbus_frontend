import { useEffect } from "react";
import { useState } from "react";
import { TicketName } from "./models/chart.model";
import Chart from 'react-apexcharts';

function BarChart(props) {
    const { data, height, currentYear, maxYAxis, categories } = props;
    const [options, setOptions] = useState({
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
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: [
                '1-11', '2-11', '3-11', '4-11', '5-11', '6-11', '7-11',
            ]
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
    });
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
        options: options,
    });

    useEffect(() => {
        if (data && data.length) {
            const opts = {
                ...options,
                xaxis: {
                    categories: [...categories]
                },
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
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, categories]);

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