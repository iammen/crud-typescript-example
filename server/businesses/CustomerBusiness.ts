import {ICustomerBusiness} from "./interfaces/ICustomerBusiness";
import {ICustomerDocument} from "../models/interfaces/ICustomerDocument";
import {CustomerRepository} from "../repositories/CustomerRepository";

export class CustomerBusiness implements ICustomerBusiness {
    private static _instance: CustomerBusiness;

    constructor (private _repo: CustomerRepository) {}

    static get Instance (): CustomerBusiness {
        return this._instance || (this._instance = new CustomerBusiness(new CustomerRepository()));
    }

    create (item: ICustomerDocument, callback: (error: any, result: any) => void): any {
        this._repo.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void): any {
         this._repo.retrieve(callback);
    }

    update (_id: string, item: ICustomerDocument, callback: (error: any, result: any) => void): any {
        this._repo.findById(_id, (err, res) => {
            if (err) {
                callback(err, res);
            } else {
                this._repo.update(res._id, item, callback);
            }
        });
    }

    delete (_id: string, callback: (error: any, result: any) => void): any {
        this._repo.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: ICustomerDocument) => void): any {
        this._repo.findById(_id, callback);
    }
}