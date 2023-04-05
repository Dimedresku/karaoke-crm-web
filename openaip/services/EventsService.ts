/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_image_api_events__event_id__upload_image_post } from '../models/Body_upload_image_api_events__event_id__upload_image_post';
import type { EventResponse } from '../models/EventResponse';
import type { EventUpdateSchema } from '../models/EventUpdateSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EventsService {

    /**
     * Get Events
     * @param limit 
     * @param page 
     * @param search 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getEventsApiEventsGet(
limit: number = 10,
page: number = 1,
search: string = '',
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/events/',
            query: {
                'limit': limit,
                'page': page,
                'search': search,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Event
     * @param requestBody 
     * @returns EventResponse Successful Response
     * @throws ApiError
     */
    public static createEventApiEventsPost(
requestBody: EventUpdateSchema,
): CancelablePromise<EventResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/events/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get One Event
     * @param eventId 
     * @returns EventResponse Successful Response
     * @throws ApiError
     */
    public static getOneEventApiEventsEventIdGet(
eventId: number,
): CancelablePromise<EventResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/events/{event_id}',
            path: {
                'event_id': eventId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Event
     * @param eventId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteEventApiEventsEventIdDelete(
eventId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/events/{event_id}',
            path: {
                'event_id': eventId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Event
     * @param eventId 
     * @param requestBody 
     * @returns EventResponse Successful Response
     * @throws ApiError
     */
    public static updateEventApiEventsEventIdPatch(
eventId: number,
requestBody: EventUpdateSchema,
): CancelablePromise<EventResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/events/{event_id}',
            path: {
                'event_id': eventId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Upload Image
     * @param eventId 
     * @param formData 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static uploadImageApiEventsEventIdUploadImagePost(
eventId: number,
formData: Body_upload_image_api_events__event_id__upload_image_post,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/events/{event_id}/upload-image',
            path: {
                'event_id': eventId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
