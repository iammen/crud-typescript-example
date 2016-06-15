import HttpStatus from "http-status-enum";
import {IOperationResponse} from "../interfaces/IOperationResponse";

export class OperationResponse<T> implements IOperationResponse {
    success: boolean;
    message: string;
    responseData: T;
    tokenKey: string;

    constructor (data: IOperationResponse) {
        this.success = data.success;
        this.message = data.message || "";
        this.responseData = data.responseData || {};
        this.tokenKey = data.tokenKey || "";
    }

    static success (): any {
        return new OperationResponse(<IOperationResponse> {
           success: true
        });
    }

    static successWithData (data: Object): any {
        return new OperationResponse(<IOperationResponse> {
           success: true,
           responseData: data
        });
    }

    static successWithToken(token: string): any {
        return new OperationResponse(<IOperationResponse> {
           success: true,
           tokenKey: token
        });
    }

    static failed (msg: string, statusCode?: number): any {
        return new OperationResponse(<IOperationResponse> {
           success: false,
           message: msg
        });
    }
}