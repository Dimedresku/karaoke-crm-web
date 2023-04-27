import dayjs from "dayjs";
import {StatisticType} from "../openaip";

const getLastDaysMap = (data: Array<any>, type: StatisticType) => {
    const range = type == StatisticType.WEEK ? 7 : 30
    const dataMap = new Map()
    for (const elem of data) {
        dataMap.set(elem.day_date, {served_count: elem.served_count, reserved_count: elem.reserved_count})
    }
    const now = dayjs()
    const daysMap = new Map()
    for (const x of Array(range).keys()) {
        daysMap.set(now.subtract(x, "d").format("YYYY-MM-DD"), {served_count: 0, reserved_count: 0})
    }
    return new Map([...daysMap.entries(), ...dataMap.entries()].sort()) as Map<string, any>
}

export {
    getLastDaysMap
}
