/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListMenuItemResponse } from '../models/ListMenuItemResponse';
import type { MenuCategory } from '../models/MenuCategory';
import type { MenuItemCreateSchema } from '../models/MenuItemCreateSchema';
import type { MenuItemFilterResponse } from '../models/MenuItemFilterResponse';
import type { MenuItemResponse } from '../models/MenuItemResponse';
import type { MenuItemUpdateSchema } from '../models/MenuItemUpdateSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MenuItemsService {

    /**
     * Get Menu Items Filter
     * @returns MenuItemFilterResponse Successful Response
     * @throws ApiError
     */
    public static getMenuItemsFilterApiMenuItemsFiltersGet(): CancelablePromise<Array<MenuItemFilterResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/menu-items/filters',
        });
    }

    /**
     * Get Menu Items
     * @param limit 
     * @param page 
     * @param order 
     * @param category 
     * @param subCategory 
     * @returns ListMenuItemResponse Successful Response
     * @throws ApiError
     */
    public static getMenuItemsApiMenuItemsGet(
limit: number = 10,
page: number = 1,
order?: string,
category?: Array<MenuCategory>,
subCategory?: Array<string>,
): CancelablePromise<ListMenuItemResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/menu-items/',
            query: {
                'limit': limit,
                'page': page,
                'order': order,
                'category': category,
                'sub_category': subCategory,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Menu Item
     * @param requestBody 
     * @returns MenuItemResponse Successful Response
     * @throws ApiError
     */
    public static createMenuItemApiMenuItemsPost(
requestBody: MenuItemCreateSchema,
): CancelablePromise<MenuItemResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/menu-items/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get One Menu Item
     * @param menuItemId 
     * @returns MenuItemResponse Successful Response
     * @throws ApiError
     */
    public static getOneMenuItemApiMenuItemsMenuItemIdGet(
menuItemId: number,
): CancelablePromise<MenuItemResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/menu-items/{menu_item_id}',
            path: {
                'menu_item_id': menuItemId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Menu Item
     * @param menuItemId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteMenuItemApiMenuItemsMenuItemIdDelete(
menuItemId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/menu-items/{menu_item_id}',
            path: {
                'menu_item_id': menuItemId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Menu Item
     * @param menuItemId 
     * @param requestBody 
     * @returns MenuItemResponse Successful Response
     * @throws ApiError
     */
    public static updateMenuItemApiMenuItemsMenuItemIdPatch(
menuItemId: number,
requestBody: MenuItemUpdateSchema,
): CancelablePromise<MenuItemResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/menu-items/{menu_item_id}',
            path: {
                'menu_item_id': menuItemId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
