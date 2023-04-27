import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import {Button, Card, CardContent, CardHeader, SvgIcon} from '@mui/material';
import {alpha, useTheme} from '@mui/material/styles';
import {Chart} from '../chart';
import {useEffect, useState} from "react";
import {getOverviewStatistic} from "../../service/api/reservationsApi";
import {StatisticType} from "../../openaip";
import {getLastDaysMap} from "../../utils/get-date-maps";

const useChartOptions = () => {
    const theme = useTheme();

    return {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false
            }
        },
        colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1,
            type: 'solid'
        },
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 2,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        legend: {
            show: false
        },
        plotOptions: {
            bar: {
                columnWidth: '40px'
            }
        },
        stroke: {
            colors: ['transparent'],
            show: true,
            width: 2
        },
        theme: {
            mode: theme.palette.mode
        },
        xaxis: {
            axisBorder: {
                color: theme.palette.divider,
                show: true
            },
            axisTicks: {
                color: theme.palette.divider,
                show: true
            },
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
                'Dec'
            ],
            labels: {
                offsetY: 5,
                style: {
                    colors: theme.palette.text.secondary
                }
            }
        },
        yaxis: {
            labels: {
                offsetX: -10,
                style: {
                    colors: theme.palette.text.secondary
                }
            }
        }
    };
};

type OverviewChartProps = {
    sx: object
}

const defaultSeries = [
    {
        name: 'Reserved',
        data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
    },
    {
        name: 'Served',
        data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
    }
]

export const OverviewChart = (props: OverviewChartProps) => {
    const { sx } = props;
    const [type, setType] = useState(StatisticType.WEEK)
    const [chartSeries, setSeries] = useState(defaultSeries)
    const [options, setOptions] = useState(useChartOptions())

    useEffect(() => {
        getOverviewStatistic(type).then((result) => {
            const daysMap = getLastDaysMap(result, type)
            getChartData(daysMap)
        })
    }, [type])

    const getChartData = (data: Map<string, any>) => {
        const reserved = []
        const served = []
        const daysLabel = []
        for (const [date_label, value] of data) {
            daysLabel.push(date_label)
            reserved.push(value.reserved_count || 0)
            served.push(value.served_count || 0)
        }
        setSeries([
            {
                name: 'Reserved',
                data: reserved
            },
            {
                name: 'Served',
                data: served
            }])

        setOptions((prev) => {
            const newXaxis = {...prev.xaxis, categories: daysLabel}
            return {...prev, xaxis: newXaxis}
        })
    }

    const toggleType = () => {
        setType((prev) => prev == StatisticType.WEEK ? StatisticType.MONTH : StatisticType.WEEK)
    }

    return (
        <Card sx={sx}>
            <CardHeader
                action={(
                    <Button
                        color="inherit"
                        size="small"
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <ArrowPathIcon />
                            </SvgIcon>
                        )}
                        onClick={toggleType}
                    >
                        {type}
                    </Button>
                )}
                title="Reserveds"
            />
            <CardContent>
                <Chart
                    height={350}
                    options={options}
                    series={chartSeries}
                    type="bar"
                    width="100%"
                />
            </CardContent>
        </Card>
    );
};

OverviewChart.protoTypes = {
    chartSeries: PropTypes.array.isRequired,
    sx: PropTypes.object
};
