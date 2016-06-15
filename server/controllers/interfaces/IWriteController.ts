import * as Express from "express";

export interface IWriteController {
    create: Express.RequestHandler;
    update: Express.RequestHandler;
    delete: Express.RequestHandler;
}