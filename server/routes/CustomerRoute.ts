import * as Express from "express";
import {CustomerController} from "../controllers/CustomerController";

export class CustomerRoute {
    // Private members
    private _router: Express.Router;
    private _controller: CustomerController;

    constructor () {
        this._router = Express.Router();
        this._controller = new CustomerController();
    }

    get routes (): Express.Router {
        this._router.delete("/customers/:id", this._controller.delete);
        this._router.get("/customers", this._controller.findAll);
        this._router.get("/customers/:id", this._controller.findById);
        this._router.post("/customers", this._controller.create);
        this._router.put("/customers", this._controller.update);

        return this._router;
    }
}