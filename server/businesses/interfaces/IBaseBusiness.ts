import {IRead} from "./IRead";
import {IWrite} from "./IWrite";

export interface IBaseBusiness<T> extends IRead<T>, IWrite<T> { }