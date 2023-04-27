/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PeopleCountStatistic } from '../models/PeopleCountStatistic';
import type { ReservationCreateSchema } from '../models/ReservationCreateSchema';
import type { ReservationResponse } from '../models/ReservationResponse';
import type { ReservationStatisticSchema } from '../models/ReservationStatisticSchema';
import type { ReservationUpdateSchema } from '../models/ReservationUpdateSchema';
import type { StatisticType } from '../models/StatisticType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReservationsService {

    /**
     * Get Reservations Statistics
     * @param type 
     * @returns ReservationStatisticSchema Successful Response
     * @throws ApiError
     */
    public static getReservationsStatisticsApiReservationsStatisticsGet(
type?: StatisticType,
): CancelablePromise<Array<ReservationStatisticSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reservations/statistics',
            query: {
                'type': type,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Reservations Statistics
     * @param type 
     * @returns PeopleCountStatistic Successful Response
     * @throws ApiError
     */
    public static getReservationsStatisticsApiReservationsPeopleCountStatisticsGet(
type?: StatisticType,
): CancelablePromise<Array<PeopleCountStatistic>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reservations/people_count_statistics',
            query: {
                'type': type,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Reservations
     * @param limit 
     * @param page 
     * @param order 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getReservationsApiReservationsGet(
limit: number = 10,
page: number = 1,
order?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reservations/',
            query: {
                'limit': limit,
                'page': page,
                'order': order,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Reservation
     * @param requestBody 
     * @returns ReservationResponse Successful Response
     * @throws ApiError
     */
    public static createReservationApiReservationsPost(
requestBody: ReservationCreateSchema,
): CancelablePromise<ReservationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/reservations/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get One Reservation
     * @param reservationId 
     * @returns ReservationResponse Successful Response
     * @throws ApiError
     */
    public static getOneReservationApiReservationsReservationIdGet(
reservationId: number,
): CancelablePromise<ReservationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reservations/{reservation_id}',
            path: {
                'reservation_id': reservationId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Reservation
     * @param reservationId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteReservationApiReservationsReservationIdDelete(
reservationId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/reservations/{reservation_id}',
            path: {
                'reservation_id': reservationId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Reservation
     * @param reservationId 
     * @param requestBody 
     * @returns ReservationResponse Successful Response
     * @throws ApiError
     */
    public static updateReservationApiReservationsReservationIdPatch(
reservationId: number,
requestBody: ReservationUpdateSchema,
): CancelablePromise<ReservationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/reservations/{reservation_id}',
            path: {
                'reservation_id': reservationId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
