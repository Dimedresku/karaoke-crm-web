import dayjs from "dayjs";

const getHumanDate = (date: string) => {
    const dateObj = dayjs(date)
    return dateObj.format("DD/MM/YYYY HH:mm")
}

export default getHumanDate;
