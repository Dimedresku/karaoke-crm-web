import {OpenAPI, ReservationUpdateSchema, ReservationCreateSchema} from "../../openaip";
import {ReservationsService} from "../../openaip";
import {getCredentials} from "./common";
import dayjs from "dayjs";

const getReservations = async (token: string) => {

    OpenAPI.TOKEN = token
    OpenAPI.WITH_CREDENTIALS = true
    OpenAPI.BASE = process.env.BACK_HOST as string

    try {
        const response = await ReservationsService.getReservationsApiReservationsGet()
        return response.reservations
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

export {
    getReservations,
    createReservation,
    deleteReservation,
    servedReservation,
    disableServedReservation
}
