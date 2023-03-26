/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseUser } from './BaseUser';

export type UserListResponse = {
    status: string;
    result: number;
    users: Array<BaseUser>;
};
