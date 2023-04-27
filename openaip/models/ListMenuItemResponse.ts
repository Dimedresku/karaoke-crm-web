/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MenuItemResponseSchema } from './MenuItemResponseSchema';

export type ListMenuItemResponse = {
    status: string;
    results: number;
    menu_items: Array<MenuItemResponseSchema>;
};
