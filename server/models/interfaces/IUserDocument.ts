import {Document} from "mongoose";

export interface IUserDocument extends Document {
    name: string;
    password: string;
}