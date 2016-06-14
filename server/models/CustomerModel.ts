import {Connection, Document, Model} from "mongoose";
import {Constants} from "../config/Constants";
import Database = require("../databases/Database");
import {ICustomerDocument} from "./interfaces/ICustomerDocument";
import CustomerSchema = require("../databases/schemas/CustomerSchema");

let connection: Connection = Database.getConnectin();

// Define and export Mongoose.Model object
const customerModel: Model<Document> = connection.model<ICustomerDocument> ("Customer", CustomerSchema);
export = customerModel;