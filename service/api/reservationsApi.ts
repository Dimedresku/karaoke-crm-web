import {ReservationCreateSchema, ReservationsService, ReservationUpdateSchema, StatisticType} from "../../openaip";
import {getCredentials} from "./common";
import dayjs from "dayjs";


type getReservationsProps = {
    limit: number,
    page: number,
    order?: string,
    filterQuery?: object
}

const getReservations = async ({limit, page, order = "", filterQuery = {}}: getReservationsProps) => {
    getCredentials()

    const dateFrom = filterQuery.dateFrom ? filterQuery.dateFrom.format("YYYY-MM-DD") : null
    const dateTo = filterQuery.dateTo ? filterQuery.dateTo.format("YYYY-MM-DD") : null

    try {
        const response = await ReservationsService.getReservationsApiReservationsGet(
            limit, page, order, dateFrom, dateTo)
        return {result: response.reservations, count: response.results}
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}

type createReservationData = {
    id?: number,
    date_reservation?: any,
    people_count?: number,
    phone_number?: string,
    email?: string,
    comment?: string,
    admin_comment?: string,
    served?: boolean

}

const createReservation = async (data: createReservationData) => {
    getCredentials()

    try {
        let reservationDate = data.date_reservation as any
        if (reservationDate instanceof dayjs) {
            // @ts-ignore
            reservationDate = reservationDate.format("YYYY-MM-DDTHH:mm:ss[Z]")
            data.date_reservation = reservationDate
        }
        if (data.id) {
            await ReservationsService.updateReservationApiReservationsReservationIdPatch(data.id, data as ReservationUpdateSchema)
        } else {
            await ReservationsService.createReservationApiReservationsPost(data as ReservationCreateSchema)
        }
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}

const deleteReservation = async (idsArray: Array<number>) => {
    getCredentials()
    try {
        await Promise.all(
            idsArray.map(
                (reservationId: number) => ReservationsService.deleteReservationApiReservationsReservationIdDelete(
                    reservationId)))
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}

const servedReservation = async (idsArray: Array<number>) => {
    getCredentials()
    try {
        await Promise.all(
            idsArray.map(
                (reservationId: number) => ReservationsService.updateReservationApiReservationsReservationIdPatch(
                    reservationId, {served: true}))
        )
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}

const disableServedReservation = async (idsArray: Array<number>) => {
    getCredentials()
    try {
        await Promise.all(
            idsArray.map(
                (reservationId) => ReservationsService.updateReservationApiReservationsReservationIdPatch(
                    reservationId, {served: false}
                ))
        )
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}

const getOverviewStatistic = async (type: StatisticType = StatisticType.WEEK) => {
    getCredentials()
    try {
        return await ReservationsService.getReservationsStatisticsApiReservationsStatisticsGet(type)
    } catch (e) {
        throw new Error(e as string)
    }
}


const getPeopleCountStatistic = async (type: StatisticType = StatisticType.WEEK) => {
    getCredentials()
    try {
        return await ReservationsService.getReservationsStatisticsApiReservationsPeopleCountStatisticsGet(type)
    } catch (e) {
        throw new Error(e as string)
    }
}


export {
    getReservations,
    createReservation,
    deleteReservation,
    servedReservation,
    disableServedReservation,
    getOverviewStatistic,
    getPeopleCountStatistic
}
