import {Document} from "mongoose";

/*
 * Define ICustomerDocument that mixin Document interface
 */
export interface ICustomerDocument extends Document {
    fullName: string;
    city: string;
    country: string;
}