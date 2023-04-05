import {getCredentials} from "./common";
import {EventsService, OpenAPI, EventUpdateSchema} from "../../openaip";


const getEvents = async (token: string) => {

    OpenAPI.TOKEN = token
    OpenAPI.WITH_CREDENTIALS = true
    OpenAPI.BASE = process.env.BACK_HOST as string

    try {
        const response = await EventsService.getEventsApiEventsGet()
        return response.events
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}


type CreateEventData = {
    id?: number,
    name: string,
    description: string,
    image?: Blob,
    changeImage: boolean
}

const createEvent = async (data: CreateEventData) => {
    getCredentials()

    try {
        if (data.id) {
            await EventsService.updateEventApiEventsEventIdPatch(data.id, data as EventUpdateSchema)
            if (data.changeImage && data.image) {
                await EventsService.uploadImageApiEventsEventIdUploadImagePost(data.id, {file: data.image})
            }
        } else {
            const response = await EventsService.createEventApiEventsPost(data as EventUpdateSchema)
            if (data.image) {
                await EventsService.uploadImageApiEventsEventIdUploadImagePost(response.event?.id, {file: data.image})
            }
        }
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }

}

const deleteEvents = async (eventIds: Array<number>) => {
    getCredentials()

    try {
        await Promise.all(eventIds.map(async (eventId: number) => EventsService.deleteEventApiEventsEventIdDelete(eventId)))
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }

}

export {
    getEvents,
    createEvent,
    deleteEvents
}
