/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_api_auth_login_post } from '../models/Body_login_api_auth_login_post';
import type { SystemUser } from '../models/SystemUser';
import type { TokenSchema } from '../models/TokenSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login
     * @param formData 
     * @returns TokenSchema Successful Response
     * @throws ApiError
     */
    public static loginApiAuthLoginPost(
formData: Body_login_api_auth_login_post,
): CancelablePromise<TokenSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Logout
     * @returns any Successful Response
     * @throws ApiError
     */
    public static logoutApiAuthLogoutGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/logout',
        });
    }

    /**
     * Refresh Token
     * @returns TokenSchema Successful Response
     * @throws ApiError
     */
    public static refreshTokenApiAuthRefreshPost(): CancelablePromise<TokenSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/refresh',
        });
    }

    /**
     * Get User
     * @returns SystemUser Successful Response
     * @throws ApiError
     */
    public static getUserApiAuthGetUserGet(): CancelablePromise<SystemUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/get-user',
        });
    }

}
