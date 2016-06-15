import fs = require("fs");

export class CustomerDataSource {
    static getCustomersFromFile (): any {
        // Read .json file synchronous
        return JSON.parse(fs.readFileSync("./src/sources/customers.json", "utf8"));
    }
}