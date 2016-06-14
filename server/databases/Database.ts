import * as mongoose from "mongoose";
import {Mongoose, Connection} from "mongoose";
import {Constants} from "../config/Constants";

/*
 * Singleton pattern for Mongoose
 */
class Database {
    private static _instance: Mongoose;
    private static _connection: Connection;

    constructor () {
        Database.connect();
    }

    static connect (): Mongoose {
        if (this._instance) {
            return this._instance;
        }

        // Assign Mongoose connection to static private member
        this._connection = mongoose.connection;
        // Bind events
        this._connection.on("error", () => {
            console.log("Error to connect database.");
        });
        this._connection.once("open", () => {
            console.log("Connected to database success.");
        });

        this._instance = mongoose.connect(Constants.DB_CONNECTION_STRING);
        return this._instance;
    }

    static getInstance (): any {
        return (this._instance) ? this._instance : this.connect();
    }

    static getConnectin (): Connection {
        return this._connection;
    }
}

Database.connect();
export = Database;