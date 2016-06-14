import {ICustomerDocument} from "../models/interfaces/ICustomerDocument";
import {BaseRepository} from "./BaseRepository";
import CustomerModel = require("../models/CustomerModel");

class CustomerRepository extends BaseRepository<ICustomerDocument> {
    constructor () {
        super (CustomerModel);
    }
}

Object.seal(CustomerRepository);
export = CustomerRepository;