import PropTypes from 'prop-types';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    SvgIcon,
    useTheme
} from '@mui/material';
import { Chart } from "../chart";
import React, {useEffect, useState} from "react";
import {StatisticType} from "../../openaip";
import {getPeopleCountStatistic} from "../../service/api/reservationsApi"
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

const getChartOptions = (theme: any, labels: Array<string> = [], colors: Array<string>) => {

    const defaultLabels = ['Desktop', 'Tablet', 'Phone']
    if (labels.length == 0) {
        labels = defaultLabels
    }

    return {
        chart: {
            background: 'transparent'
        },
        colors: colors,
        dataLabels: {
            enabled: false,
        },
        labels,
        legend: {
            show: false
        },
        plotOptions: {
            pie: {
                expandOnClick: false
            }
        },
        states: {
            active: {
                filter: {
                    type: 'none'
                }
            },
            hover: {
                filter: {
                    type: 'none'
                }
            }
        },
        stroke: {
            width: 0
        },
        theme: {
            mode: theme.palette.mode
        },
        tooltip: {
            fillSeriesColor: false
        }
    };
};

type OverviewTrafficProps = {
    sx: any
}


export const OverviewTraffic = ({sx}: OverviewTrafficProps) => {
    const theme = useTheme();
    const defaultColors = [
        theme.palette.primary.main,
        theme.palette.success.main,
        theme.palette.warning.main,
        theme.palette.secondary.main,
    ]
    const [type, setType] = useState(StatisticType.WEEK)
    const [chartSeries, setChartSeries] = useState([63, 15, 22])
    const [chartOptions, setChartOptions] = useState(getChartOptions(theme,[], defaultColors));


    useEffect(() => {
        getPeopleCountStatistic(type).then((result) => {
            const series = []
            const labelsArr = []
            result = result.sort((a, b) => {
                if (a.reservations_count > b.reservations_count) return -1
                if (a.reservations_count < b.reservations_count) return 1
                return 0
            })
            for (const elem of result) {
                series.push(elem.reservations_count || 0)
                labelsArr.push(`${elem.people_count} seats`)
            }
            const extraColorsCount = labelsArr.length - defaultColors.length
            const extraColorsArr = []
            if (extraColorsCount > 0) {
                for (const x of Array(extraColorsCount)) {
                    const extraColor =  Math.floor(Math.random()*16777215).toString(16).padStart(6, "0");
                    extraColorsArr.push(`#${extraColor}`)
                }
            }
            console.log(extraColorsArr)
            const options = getChartOptions(theme, labelsArr, [...defaultColors, ...extraColorsArr])
            setChartOptions(options)
            setChartSeries(series)
        })

    }, [type, theme])

    const toggleType = () => {
        setType((prev) => prev == StatisticType.WEEK ? StatisticType.MONTH : StatisticType.WEEK)
    }

    return (
        <Card sx={sx}>
            <CardHeader title="Tables count"
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

            />
            <CardContent>
                <Chart
                    height={300}
                    options={chartOptions}
                    series={chartSeries}
                    type="donut"
                    width="100%"
                />
            </CardContent>
        </Card>
    );
};

OverviewTraffic.propTypes = {
    chartSeries: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    sx: PropTypes.object
};
