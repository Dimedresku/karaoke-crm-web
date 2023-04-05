/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ReservationCreateSchema = {
    date_reservation: string;
    people_count: number;
    phone_number: string;
    email?: string;
    comment: string;
    admin_comment: string;
    serverd?: boolean;
};
