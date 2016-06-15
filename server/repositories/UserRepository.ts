import {IUserDocument} from "../models/interfaces/IUserDocument";
import {BaseRepository} from "./BaseRepository";
import UserModel = require("../models/UserModel");

export class UserRepository extends BaseRepository<IUserDocument> {
    constructor () {
        super(UserModel);
    }
}