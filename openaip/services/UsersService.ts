/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_image_api_users__user_id__upload_image_post } from '../models/Body_upload_image_api_users__user_id__upload_image_post';
import type { CreateUser } from '../models/CreateUser';
import type { UpdateUser } from '../models/UpdateUser';
import type { UserListResponse } from '../models/UserListResponse';
import type { UserResponse } from '../models/UserResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Get All Users
     * @param limit 
     * @param page 
     * @param search 
     * @returns UserListResponse Successful Response
     * @throws ApiError
     */
    public static getAllUsersApiUsersGet(
limit: number = 10,
page: number = 1,
search: string = '',
): CancelablePromise<UserListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/',
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
     * Create User
     * @param requestBody 
     * @returns UserResponse Successful Response
     * @throws ApiError
     */
    public static createUserApiUsersPost(
requestBody: CreateUser,
): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete User
     * @param userId 
     * @returns void 
     * @throws ApiError
     */
    public static deleteUserApiUsersUserIdDelete(
userId: number,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update User
     * @param userId 
     * @param requestBody 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateUserApiUsersUserIdPatch(
userId: number,
requestBody: UpdateUser,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users/{user_id}',
            path: {
                'user_id': userId,
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
     * @param userId 
     * @param formData 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static uploadImageApiUsersUserIdUploadImagePost(
userId: number,
formData: Body_upload_image_api_users__user_id__upload_image_post,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/{user_id}/upload-image',
            path: {
                'user_id': userId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
