import {Mongoose, Model, Document, Types} from "mongoose";
import {IRead} from "./interfaces/IRead";
import {IWrite} from "./interfaces/IWrite";

export class BaseRepository<T extends Document> implements IRead<T>, IWrite<T> {
    private _model: Model<Document>;

    constructor (model: Model<Document>) {
        this._model = model;
    }

    create (item: T, callback: (error: any, result: any) => void): any {
        this._model.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void): any {
         this._model.find({}, callback);
    }

    update (_id: Types.ObjectId, item: T, callback: (error: any, result: any) => void): any {
            this._model.update({_id: _id}, item, callback);
    }

    delete (_id: string, callback: (error: any, result: any) => void): any {
        this._model.remove({_id: this.toObjectId(_id)}, (err) => callback(err, null));
    }

    findById (_id: string, callback: (error: any, result: T) => void): any {
        this._model.findById( _id, callback);
    }

    private toObjectId (_id: string) : Types.ObjectId {
        return Types.ObjectId.createFromHexString(_id);
    }
}