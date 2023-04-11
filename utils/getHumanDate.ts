import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"

const getHumanDate = (date: string) => {
    dayjs.extend(utc)
    const dateObj = dayjs.utc(date)
    return dateObj.format("DD/MM/YYYY HH:mm")
}

export default getHumanDate;
