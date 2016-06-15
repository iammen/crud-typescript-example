import * as Express from "express";
import * as Mongoose from "mongoose";
import HTTP_STATUS_CODES from "http-status-enum";
import {Constants} from "../config/Constants";
import {IBaseController} from "./interfaces/IBaseController";
import {ICustomerDocument} from "../models/interfaces/ICustomerDocument";
import {ICustomerBusiness} from "../businesses/interfaces/ICustomerBusiness";
import {CustomerBusiness} from "../businesses/CustomerBusiness";
import {OperationResponse} from "../models/pojos/OperationResponse";
import {CustomerDataSource} from "../sources/CustomerDataSource";

export class CustomerController implements IBaseController<ICustomerBusiness> {

    /**
     * Create customer object
     * @param  {Express.Request} req
     * @param  {Express.Response} res
     * @returns void
     */
    create (req: Express.Request, res: Express.Response): void {
        try {
            let newCustomer: ICustomerDocument = <ICustomerDocument> req.body;
            CustomerBusiness.Instance.create (newCustomer, (err, customer) => {
                // Error occurs
                if (err) {
                    res.jsonp(OperationResponse.failed("Failed to create."));
                } else {
                    res.jsonp(OperationResponse.successWithData(customer));
                }
            });
        } catch (e) {
            res.jsonp(OperationResponse.failed(e.message));
        }
    }

    /**
     * Delete customer object
     * @param  {Express.Request} req
     * @param  {Express.Response} res
     * @returns void
     */
    delete (req: Express.Request, res: Express.Response): void {
        try {
            let id: string = req.params.id;
            CustomerBusiness.Instance.delete (id, (err) => {
                // Error occurs
                if (err) {
                    res.jsonp(OperationResponse.failed("Failed to delete."));
                } else {
                    res.jsonp(OperationResponse.success());
                }
            });
        } catch (e) {
            res.jsonp(OperationResponse.failed(e.message));
        }
    }

    /**
     * Find the list of customer object
     * @param  {Express.Request} req
     * @param  {Express.Response} res
     * @returns void
     */
    findAll (req: Express.Request, res: Express.Response): void {
        try {
            CustomerBusiness.Instance.retrieve ((err, customers) => {
                // Error occurs
                if (err) {
                    res.jsonp(OperationResponse.failed("Failed to find all customers."));
                } else {
                    res.jsonp(OperationResponse.successWithData(customers));
                }
            });
        } catch (e) {
            res.jsonp(OperationResponse.failed(e.message));
        }
    }

    /**
     * Find customer object with ID
     * @param  {Express.Request} req
     * @param  {Express.Response} res
     * @returns void
     */
    findById (req: Express.Request, res: Express.Response): void {
        try {
            let id: string = req.params.id;
            CustomerBusiness.Instance.findById (id, (err, customer) => {
                // Error occurs
                if (err) {
                    res.jsonp(OperationResponse.failed("Failed to find customer."));
                } else {
                    res.jsonp(OperationResponse.successWithData(customer));
                }
            });
        } catch (e) {
            res.jsonp(OperationResponse.failed(e.message));
        }
    }

    /**
     * Update customer object
     * @param  {Express.Request} req
     * @param  {Express.Response} res
     * @returns void
     */
    update (req: Express.Request, res: Express.Response): void {
        try {
            let customer: ICustomerDocument = <ICustomerDocument> req.body;
            CustomerBusiness.Instance.update (customer._id, customer, (err, affectedRow) => {
                // If error occurs
                if (err) {
                    res.jsonp(OperationResponse.failed("Failed to update."));
                } else {
                    res.jsonp(OperationResponse.success());
                }
            });
        } catch (e) {
            res.jsonp(OperationResponse.failed(e.message));
        }
    }
}