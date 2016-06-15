import {IUserBusiness} from "./interfaces/IUserBusiness";
import {IUserDocument} from "../models/interfaces/IUserDocument";
import {UserRepository} from "../repositories/UserRepository";

export class CustomerBusiness implements IUserBusiness {
    private _repo: UserRepository;

    constructor () {
        this._repo = new UserRepository();
    }

    create (item: IUserDocument, callback: (error: any, result: any) => void): any {
        this._repo.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void): any {
         this._repo.retrieve(callback);
    }

    update (_id: string, item: IUserDocument, callback: (error: any, result: any) => void): any {
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

    findById (_id: string, callback: (error: any, result: IUserDocument) => void): any {
        this._repo.findById(_id, callback);
    }
}