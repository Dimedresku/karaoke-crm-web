import {getCredentials} from "./usersApi";
import {EventsService, OpenAPI} from "../../openaip";


const getEvents = async (token: string) => {

    OpenAPI.TOKEN = token
    OpenAPI.WITH_CREDENTIALS = true
    OpenAPI.BASE = "http://192.168.56.110:8080"

    try {
        const response = await EventsService.getEventsApiEventsGet()
        return response.events
    } catch (e) {
        throw new Error(e)
    }
}

export {
    getEvents
}
