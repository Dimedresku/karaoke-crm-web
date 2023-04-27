import {getCredentials} from "./common";
import {EventsService, EventUpdateSchema} from "../../openaip";


type getEventsProps = {
    limit: number,
    page: number
}

const getEvents = async ({limit, page}: getEventsProps) => {
    getCredentials()

    try {
        const response = await EventsService.getEventsApiEventsGet(limit, page)
        return {result: response.events, count: response.results}
    } catch (e) {
        throw new Error(e as string)
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
        throw new Error(e as string)
    }

}

const deleteEvents = async (eventIds: Array<number>) => {
    getCredentials()

    try {
        await Promise.all(eventIds.map(async (eventId: number) => EventsService.deleteEventApiEventsEventIdDelete(eventId)))
    } catch (e) {
        throw new Error(e as string)
    }

}

const publishEvents = async (eventIds: Array<number>) => {
    getCredentials()

    try {
        await Promise.all(
            eventIds.map(
                async (eventId: number) => EventsService.updateEventApiEventsEventIdPatch(eventId, {published: true})))
    } catch (e) {
        throw new Error(e as string)
    }
}

const unPublishEvents = async (eventIds: Array<number>) => {
    getCredentials()

    try {
        await Promise.all(eventIds.map(async (eventId: number) => EventsService.updateEventApiEventsEventIdPatch(eventId, {published: false})))
    } catch (e) {
        throw new Error(e as string)
    }
}

export {
    getEvents,
    createEvent,
    deleteEvents,
    publishEvents,
    unPublishEvents
}
