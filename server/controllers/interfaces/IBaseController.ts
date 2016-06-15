import {IReadController} from "./IReadController";
import {IWriteController} from "./IWriteController";
import {IBaseBusiness} from "../../businesses/interfaces/IBaseBusiness";

export interface IBaseController<T> extends IReadController, IWriteController { }