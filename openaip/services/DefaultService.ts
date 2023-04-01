/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_user_create_user_get } from '../models/Body_create_user_create_user_get';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Create User
     * @param formData 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createUserCreateUserGet(
formData: Body_create_user_create_user_get,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/create-user',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
