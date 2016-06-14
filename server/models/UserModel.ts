import {Connection, Document, Model} from "mongoose";
import {Constants} from "../config/Constants";
import Database = require("../databases/Database");
import {IUserDocument} from "./interfaces/IUserDocument";
import UserSchema = require("../databases/schemas/UserSchema");

let connection: Connection = Database.getConnectin();

// Define and export Mongoose.Model object
const userModel: Model<Document> = connection.model<IUserDocument> ("User", UserSchema);
export = userModel;