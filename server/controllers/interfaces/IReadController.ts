import * as Express from "express";

export interface IReadController {
    findAll: Express.RequestHandler;
    findById: Express.RequestHandler;
}