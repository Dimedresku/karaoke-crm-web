/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MenuCategory } from './MenuCategory';

export type MenuItemCreateSchema = {
    category: MenuCategory;
    sub_category: string;
    name: string;
    sub_name: string;
    main_unit: string;
    main_price: string;
    secondary_unit?: string;
    secondary_price?: string;
    special?: boolean;
    createdAt?: string;
    updatedAt?: string;
};
