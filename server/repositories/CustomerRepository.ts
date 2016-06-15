import {ICustomerDocument} from "../models/interfaces/ICustomerDocument";
import {BaseRepository} from "./BaseRepository";
import CustomerModel = require("../models/CustomerModel");

export class CustomerRepository extends BaseRepository<ICustomerDocument> {
    constructor () {
        super (CustomerModel);
    }
}